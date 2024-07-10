import winston from "winston";

const PROCESS = process.env.NODE_ENV === "production" ? "info" : "debug";

const logFormat = winston.format.combine(
	winston.format.timestamp(),
	winston.format.printf(({ timestamp, level, message }) => {
		return `${timestamp} [${level}]: ${message}`;
	}),
);

const transports = [
	new winston.transports.Console({
		format: winston.format.combine(winston.format.colorize(), logFormat),
		level: PROCESS,
	}),
	new winston.transports.File({
		filename: "error.log",
		level: "error",
		format: logFormat,
	}),
];

const logger = winston.createLogger({
	level: PROCESS,
	format: logFormat,
	transports,
});

export default logger;

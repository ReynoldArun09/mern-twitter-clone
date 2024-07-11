import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import MongoConnection from "./config/MongoConnection.js";
import logger from "./utils/logger.js";
import { authRoute } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5001;
const origin =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_ORIGIN
    : process.env.DEV_ORIGIN;

app.use(
  cors({
    origin,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use('/api/v1/auth', authRoute)


MongoConnection();

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

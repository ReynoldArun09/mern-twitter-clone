import express from "express";
import "dotenv/config";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { v2 as cloudinary } from "cloudinary";
import MongoConnection from "./config/MongoConnection.js";
import logger from "./utils/logger.js";
import { authRoute, notificationRoute, postRoute, userRoute } from "./routes/index.js";

const app = express();
const port = process.env.PORT || 5001;
const origin =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_ORIGIN
    : process.env.DEV_ORIGIN;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/notification", notificationRoute)
app.use("/api/v1/user", userRoute)

MongoConnection();

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

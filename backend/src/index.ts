import "dotenv/config";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import ConnectToDB from "./db";
import { errorHandler } from "./middlewares/error.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/async.middleware";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.post(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Hello, World!!",
    });
  })
);

app.use(authRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `Server is listening on http://localhost:${config.PORT} and running environment: ${config.NODE_ENV}`
  );
  await ConnectToDB();
});

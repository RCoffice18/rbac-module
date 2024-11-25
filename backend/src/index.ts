import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";

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

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello, World!!",
  });
});

app.listen(config.PORT, () => {
  console.log(
    `Server is listening on http://localhost:${config.PORT} and running environment: ${config.NODE_ENV}`
  );
});

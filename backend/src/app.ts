import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as postRouter } from "./routes/postRouter";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import { errorHandler, notFound } from "./middlewares/notfound";

dotenv.config();
export const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.cookies);
  console.log(req.originalUrl);
  next();
});

// Routes

app.use("/api/posts", postRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.use(errorHandler);
app.use(notFound);

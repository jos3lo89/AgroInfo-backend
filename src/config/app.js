import express from "express";
import cors from "cors";
import morgan from "morgan";
import { URL_FRONTEND } from "./config.js";
import router from "../routes/usuario.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: URL_FRONTEND,
  })
);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", router);

app.all("/ping", (_req, res) => {
  try {
    res.json({ message: ["pong"] });
  } catch (error) {
    res.status(5000).json({ message: [error.message] });
  }
});

export default app;

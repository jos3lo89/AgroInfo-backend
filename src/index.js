import express from "express";
import { config } from "dotenv";
import cors from "cors";
config();

const app = express();
app.use(cors());

app.get("/ping", (_req, res) => {
  try {
    res.json({ message: ["pong"] });
  } catch (error) {
    res.status(5000).json({ message: [error.message] });
  }
});


app.use((req, res) => {
  res.json({ message: ["Not Found"] });
});
app.listen(process.env.PORT, () => console.log("sever ON"));
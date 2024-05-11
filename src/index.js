// import app from "./config/app.js";
import { PORT } from "./config/config.js";

/* function severOn() {
  try {
    app.listen(PORT);
    console.log(`server on port ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
}

severOn();
 */


import express from 'express';

const app = express()
app.use((_req, res) => {
  res.status(404).json({message: ["Not Found"]})
})

app.listen(PORT, () => console.log("server on"))
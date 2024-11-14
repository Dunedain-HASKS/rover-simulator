import express, { json } from "express";
const app = express();
const port = process.env.PORT || 8000;
import fileRouter from "./router/streamRoutes.js";
import { config } from "dotenv";
config();

import cors from "cors";
app.use(cors());

import connectDB from "./config/db.js";
connectDB();

import publisher from "./config/publisher.js";
publisher();

import subscriber from "./config/mqtt.js";
subscriber();

app.use(json());
import roverRoutes from "./router/roverRoutes.js";
import accDataRoutes from "./router/accDataRoutes.js";
app.use("/api/rover", roverRoutes);
app.use("/api/accData", accDataRoutes);
app.use("/api/file", fileRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
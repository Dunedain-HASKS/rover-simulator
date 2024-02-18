import express, { json } from "express";
const app = express();
const port = process.env.PORT || 8000;

import { config } from "dotenv";
config();

import cors from "cors";
app.use(cors());

import connectDB from "./config/db.js";
connectDB();

import publisher from "./config/publisher.js";
// publisher();

import subscriber from "./config/mqtt.js";
subscriber();

app.use(json());
import roverRoutes from "./router/roverRoutes.js";
app.use("/api/rover", roverRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});

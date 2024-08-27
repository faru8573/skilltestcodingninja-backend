import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { userRouter } from "./src/router/user.routes.js";
import { connectDB } from "./src/config/db.js";
import { reviewRouter } from "./src/router/review.routes.js";
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/employee", userRouter);
app.use("/api/review", reviewRouter);
// default response
app.get("/", (req, res) => {
  res.send("welcome to ers system");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  connectDB();
});

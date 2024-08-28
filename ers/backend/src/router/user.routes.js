import express from "express";
import { UserController } from "../controller/user.controller.js";
// import { authUser } from "../middlewares/auth.js";

import { auth } from "../middlewares/auth.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", userController.getAllEmployees);
userRouter.post("/registration", userController.registration);
userRouter.post("/login", auth);
userRouter.put("/", userController.updateEmployee);
userRouter.delete("/", userController.removeEmployee);

export { userRouter };

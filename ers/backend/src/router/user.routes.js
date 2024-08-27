import express from "express";
import { UserController } from "../controller/user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", userController.getAllEmployees);
userRouter.post("/", userController.registration);
userRouter.put("/", userController.updateEmployee);
userRouter.delete("/", userController.removeEmployee);

export { userRouter };

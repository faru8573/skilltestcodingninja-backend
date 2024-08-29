import express from "express";
import { UserController } from "../controller/user.controller.js";
// import { authUser } from "../middlewares/auth.js";

import { auth } from "../middlewares/auth.middleware..js";
import { isAdmin, isAuthenticated } from "../middlewares/middlewares.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", userController.getAllEmployees);
userRouter.post("/registration", userController.registration);
userRouter.post("/login", auth);
userRouter.put("/", isAuthenticated, isAdmin, userController.updateEmployee);
userRouter.delete("/", isAuthenticated, isAdmin, userController.removeEmployee);
userRouter.post("/logout", userController.logout);

export { userRouter };

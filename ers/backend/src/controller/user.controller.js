import { UserModel } from "../model/user.model.js";
import bcrypt from "bcrypt";

export class UserController {
  async registration(req, res) {
    try {
      const { username, email, password, role } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await UserModel.signUp(
        username,
        email,
        hashedPassword,
        role
      );
      res.status(201).send(newUser);
    } catch (error) {
      console.error("Error during registration", error);
      res.status(500).send("Something went wrong");
    }
  }

  // async loginUser(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     const user = await UserModel.getUserByEmail(email);

  //     if (!user) {
  //       return res.status(400).send("Invalid user");
  //     }

  //     console.log("user in controller", user);

  //     await bcrypt.compare(
  //       password.toString(),
  //       user.password,
  //       (err, result) => {
  //         if (err) {
  //           console.log(err);
  //         }

  //         if (!result) {
  //           return res.status(400).send("Invalid credentials");
  //         }

  //         res.status(200).send("login successful");
  //       }
  //     );
  //   } catch (error) {
  //     console.log("error while login user in controller", error);
  //     res.status(500).send("something went wrong");
  //   }
  // }

  async getAllEmployees(req, res) {
    try {
      const employees = await UserModel.get();
      return res.status(200).send(employees);
    } catch (error) {
      console.log("error while registering user in controller", error);
      res.status(500).send("something went wrong");
    }
  }

  async updateEmployee(req, res) {
    try {
      const updatedEmployee = await UserModel.update(req.body);
      return res.status(200).send(updatedEmployee);
    } catch (error) {
      console.log("error while updating user in controller", error);
      res.status(500).send("something went wrong");
    }
  }

  async removeEmployee(req, res) {
    try {
      const { empId } = req.body;
      const result = await UserModel.remove(empId);
      if (!result) {
        return res.status(404).send("user not found");
      }
      res.status(200).send();
    } catch (error) {
      console.log("error while delete user in controller", error);
      res.status(500).send("something went wrong");
    }
  }

  logout(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }

      req.session.destroy((err) => {
        if (err) {
          return next(err);
        }

        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logout successful" });
      });
    });
  }
}

import { UserModel } from "../model/user.model.js";

export class UserController {
  async registration(req, res) {
    try {
      const { username, email, password, role } = req.body;
      const newUser = await UserModel.signUp(username, email, password, role);
      res.status(201).send(newUser);
    } catch (error) {
      console.log("error while registering user in controller", error);
      res.status(500).send("something went wrong");
    }
  }

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
      console.log("req.body", req.body);
      const { empId } = req.body;
      console.log("empId", empId);

      const result = await UserModel.remove(empId);
      console.log("result in controller", result);
      if (!result) {
        return res.status(404).send("user not found");
      }
      res.status(200).send();
    } catch (error) {
      console.log("error while delete user in controller", error);
      res.status(500).send("something went wrong");
    }
  }

  async loginEmployee(req, res) {}
}

import { Employee } from "./schema.js";

export class UserModel {
  static async get() {
    try {
      const employees = await Employee.find();
      return employees;
    } catch (error) {
      console.log("error while signup user", error);
      throw new Error("something went wrong");
    }
  }

  static async signUp(username, email, password, role) {
    try {
      const newUser = new Employee({ username, email, password, role });
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log("error while signup user", error);
      throw new Error("something went wrong");
    }
  }

  static async update({ username, email, role, _id }) {
    try {
      const result = await Employee.findByIdAndUpdate(
        _id,
        {
          username,
          email,
          role,
        },
        { new: true }
      );

      return result;
    } catch (error) {
      console.log("error while signup user", error);
      throw new Error("something went wrong");
    }
  }

  static async remove(empId) {
    try {
      const result = await Employee.findByIdAndDelete(empId);
      if (!result) {
        return res.status(404).send("user not found");
      }

      return result;
    } catch (error) {
      console.log("error while deleting user", error);
      throw new Error("something went wrong");
    }
  }

  static async getUserByEmail(email) {
    try {
      const result = await Employee.findOne({ email });

      if (!result) {
        return null;
      }

      return result;
    } catch (error) {
      console.log("error while login user", error);
      throw new Error("something went wrong");
    }
  }

  static async getUserById(id) {
    try {
      const user = await Employee.findById(id);

      if (!user) {
        return null;
      }

      return user;
    } catch (error) {
      console.log("error while login user", error);
      throw new Error("something went wrong");
    }
  }
}

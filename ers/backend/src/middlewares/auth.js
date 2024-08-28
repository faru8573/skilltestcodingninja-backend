import { UserModel } from "../model/user.model.js";
import bcrypt from "bcrypt";
import passport from "passport";

export const auth = (req, res, next) => {
  const result = passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({ message: "Login successful", user });
    });
  });

  result(req, res, next);
};

// Authenticate fun used by passport Localstregy
export const authUser = async (email, password, done) => {
  try {
    const user = await UserModel.getUserByEmail(email);
    console.log("first ye call hua ");
    if (!user) {
      return done(null, false, { message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password.toString(), user.password);
    if (!isMatch) {
      return done(null, false, { message: "Invalid password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

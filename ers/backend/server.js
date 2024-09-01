import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";

import { userRouter } from "./src/router/user.routes.js";
import { connectDB } from "./src/config/db.js";
import { reviewRouter } from "./src/router/review.routes.js";
import { UserModel } from "./src/model/user.model.js";
import { authUser } from "./src/middlewares/auth.middleware..js";
const PORT = process.env.PORT;

const app = express();

// -------- middlewares ---------
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 60,
    },
  })
);

app.use(passport.initialize()); //  Initialize passport
app.use(passport.session()); // use passport session

passport.use(new LocalStrategy({ usernameField: "email" }, authUser));

passport.serializeUser((user, done) => {
  //serialize user id into the session
  console.log("second ye call hua");
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  // Deserialize user from the session
  try {
    const user = await UserModel.getUserById(id);
    console.log("third ye call hua");
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// -------- all api url --------
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

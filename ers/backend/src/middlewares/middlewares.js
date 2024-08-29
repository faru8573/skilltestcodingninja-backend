export const isAuthenticated = (req, res, next) => {
  // console.log("req.user", req.user);
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(400).json({ message: "Please login first" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role == "admin") {
    return next();
  } else {
    return res.status(403).json({ message: "Access denied" });
  }
};

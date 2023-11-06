const express = require("express");
const { login, logout, getUser, myProfile } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/getUser").get(getUser);
userRouter.route("/me").get(isAuthenticated, myProfile)

module.exports = userRouter;

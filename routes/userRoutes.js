const express = require("express");
const { login, logout, getUser, myProfile, contact, update, addTimeLine, addProject, deleteTimeLine, deleteProject } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/getUser").get(getUser);
userRouter.route("/me").get(isAuthenticated, myProfile);
userRouter.route("/message").post(contact);
userRouter.route("/admin/update").put(isAuthenticated, update);
userRouter.route("/admin/timeline/add").post(isAuthenticated, addTimeLine);
userRouter.route("/admin/project/add").post(isAuthenticated, addProject);
userRouter.route("/admin/timline/:id").delete(isAuthenticated,deleteTimeLine)
userRouter.route("/admin/project/:id").delete(isAuthenticated,deleteProject)


module.exports = userRouter;

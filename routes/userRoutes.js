const express = require("express");

const { registerUser, loginUser } = require("../controllers/userController");

const { createTask, getTask,deleteTask } = require("../controllers/taskController");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// Task opearations
router.route("/createTask").post(isAuthenticatedUser, createTask);
router.route("/tasks").get(isAuthenticatedUser, getTask);
router.route("/task/:taskId").delete(isAuthenticatedUser, deleteTask);

module.exports = router;

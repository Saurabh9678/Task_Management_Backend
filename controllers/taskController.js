const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Task = require("../models/task");
const User = require("../models/user");

exports.createTask = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  if (!title || !description) {
    return next(
      new ErrorHandler("Both title and description must be provided", 400)
    );
  }

  const task = await Task.create({
    title,
    description,
    userId,
  });

  res.status(200).json({
    success: true,
    task,
  });
});

exports.getTask = catchAsyncError(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Task,
        as: "task",
        attributes: { exclude: ["userId"] }, // Exclude the userId field
      },
    ],
  });

  if (user.task.length===0) {
    return res.status(200).json({
      success: true,
      message: "You have no task",
    });
  }

  res.status(200).json({
    success: true,
    task: user.task,
  });
});


exports.deleteTask = catchAsyncError(async (req, res, next) => {
    const taskId = req.params.taskId;
    const userId = req.user.id;
  
    // Find the task by task ID and user ID
    const task = await Task.findOne({
      where: {
        id: taskId,
        userId: userId,
      },
    });
  
    // If the task doesn't exist or doesn't belong to the user
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }
  
    // Delete the task
    await task.destroy();
  
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  });
  
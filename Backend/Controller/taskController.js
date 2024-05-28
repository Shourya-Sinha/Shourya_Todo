const Todo = require("../Model/todoModel");
const User = require("../Model/userModel");
const moment = require("moment");



exports.createTask = async (req, res) => {
  try {
    const localTime = moment();
    const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");
    const userId = req.userId;

    const user = await User.findById(userId);

    const { task } = req.body;

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found First please login",
      });
    }

    const newTask = new Todo({
      task: task,
      user: userId,
      createdAt:newTime,
    });

    await newTask.save();

    return res.status(200).json({
        status: "success",
        message:"Task successfully created",
        data: newTask
      });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const localTime = moment();
    const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found First please login",
      });
    }

    //const {task} = req.body;
    const { taskId, task } = req.body;

    const existing_task = await Todo.findById(taskId);

    if (!existing_task) {
      return res.status(400).json({
        status: "error",
        message: "Task not found",
      });
    }

    existing_task.task = task;
    existing_task.updatedAt = newTime;
    existing_task.completedAt = null;
    existing_task.completed = false;

    await existing_task.save();

    return res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      task: existing_task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

exports.completTask = async (req, res) => {
  try {
    const localTime = moment();
    const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found First please login",
      });
    }

    const { taskId } = req.body;
    const existing_task = await Todo.findById(taskId);
    if (!existing_task) {
      return res.status(400).json({
        status: "error",
        message: "Task not found",
      });
    }
    existing_task.completedAt = newTime;
    existing_task.completed = true;

    await existing_task.save();

    return res.status(200).json({
      status: "success",
      message: "Task completed successfully",
      task: existing_task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

exports.deletedTask = async (req, res) => {
  try {

    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found First please login",
      });
    }
    const { taskId } = req.body;
    const existing_task = await Todo.findByIdAndDelete(taskId);
    if (!existing_task) {
      return res.status(400).json({
        status: "error",
        message: "Task not found",
      });
    }


    user.noOfDeletedTask = (user.noOfDeletedTask || 0) + 1;

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
      task: existing_task,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

exports.getAllTask = async (req, res) => {
  try {
    const  userId  = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User not found First please login",
      });
    }
    const tasks = await Todo.find({ user: userId });

    if (tasks.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'No tasks found',
        });
      }

      return res.status(200).json({
        status: 'success',
        message: 'All tasks',
        tasks: tasks,
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      status: "error",
    });
  }
};

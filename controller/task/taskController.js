const task = require('../../model/task/taskmodel');

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { TaskName, TaskDesc, TaskImp } = req.body;

    const newTask = new task({
      taskName,
      taskDesc,
      taskImp,
      userId: req.user.id,
    });

    await newTask.save();
    res.status(200).json({ message: "Task created successfully", task: newTask });

  } catch (err) {
    res.status(500).json({ message: "Error creating task", error: err });
  }
};

// Delete Task
exports.DelTask = async (req, res) => {
  try {
    const { taskid } = req.body;

    const deletedTask = await task.findOneAndDelete({
      _id: taskid,
      userId: req.user.id, // make sure user owns the task
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task deleted successfully", task: deletedTask });

  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
};

// Edit Task
exports.EditTask = async (req, res) => {
  try {
    const { taskid, taskName,taskDesc, taskImp } = req.body;

    const updatedTask = await task.findOneAndUpdate(
      { _id: taskid, userId: req.user.id },
      {
        taskName,
        taskDesc,
        taskImp,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    res.status(200).json({ message: "Task updated successfully", task: updatedTask });

  } catch (err) {
    res.status(500).json({ message: "Error editing task", error: err });
  }
};

// List All Tasks for Logged-in User
exports.ListTask = async (req, res) => {
  try {
    const tasks = await task.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({ tasks });

  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks", error: err });
  }
};


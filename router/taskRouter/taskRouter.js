const express = require("express");
const router = express.Router();
const { createTask, DelTask, EditTask,ListTask} = require("../../controller/task/taskController.js");


router.post('/createTask',createTask);
router.delete('/DeleteTask',DelTask);
router.patch('/EditTask',EditTask);
router.get('/ListTask',ListTask);





module.exports = router;


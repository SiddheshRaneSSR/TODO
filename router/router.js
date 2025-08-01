const express = require('express');
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
//teing 

const userRouter = require('./userRouter/userRouter');
const taskRouter = require('./taskRouter/taskRouter');


router.use('/user', userRouter); // Now /user/register will work
router.use('/task',authenticateJWT,taskRouter);


module.exports = router;






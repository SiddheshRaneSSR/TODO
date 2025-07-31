const express = require("express");
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const router = require('./router/router.js');
const connectDB = require('./config/db.js')


app.use(express.json());
app.use(cors());



connectDB();
app.use('/api',router);
 




app.listen(PORT,()=>{

	console.log(`Server started at port ${PORT}`);

})

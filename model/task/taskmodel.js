const mongoose = require('mongoose');
const { Schema } = mongoose;


const TaskSchema = new Schema({
	
	taskName:{
	type:String,
	required:true,
	},
	taskImp:{
	type:Number,
	enum:[1,2,3],
	required:true,
	},
	
	taskDesc:{
	type:String,
	required:false,
	},
	 userId: {
    	type: mongoose.Schema.Types.ObjectId,
    	ref: 'User',
    	required: true,
  	},

	createdAt:{
		
	type:Date,
	default:Date.now,
	},


});


module.exports = mongoose.model('Task',TaskSchema);

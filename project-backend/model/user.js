// 用户表
const mongoose = require('mongoose')
// 专门做映射表
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: Number,
		unique: true,
		require: true,
		min: 100000,
		max: 999999
	},
	password:{
		type: String,
        require: true,
		minlength: 1,
		maxlength: 6
	},
	isAdmin: {
		type: Boolean,
		require: true
	}
}, {
	collection: 'user',
	versionKey: false
})

module.exports = mongoose.model('user', UserSchema)

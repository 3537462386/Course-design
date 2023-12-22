const User_col = require('../model/user')
const config = require('../config/config')

// 登录操作
const login = async (ctx, next) => {
	// console.log('body:', ctx.request.body);
	const { username, password } = ctx.request.body;
	// 查表
	try {
		const user_data = await User_col.findOne({
			username: username
		})
		if (!user_data) {//不存在
			ctx.status = 200;
			ctx.body = {
				code: 0,
				msg: '用户不存在'
			}
			return;
		}
	} catch (err) {
		ctx.status = 200;
		ctx.body = {
			code: -1,
			msg: '用户名应为纯数字'
		}
		return;
	}
	const result = await User_col.findOne({
		username: username
	})
	if (result.password === password) {//密码正确
		ctx.body = {
			code: 1,
			msg: '登录成功',
			data: result
		}
	} else {
		ctx.status = 200
		ctx.body = {
			code: -2,
			msg: '密码错误'
		}
	}
}

// 注册操作
const register = async (ctx, next) => {
	const { username, password, isAdmin } = ctx.request.body
	// 查表
	try {
		const result = await User_col.findOne({
			username: username
		})
		if (result) {
			ctx.body = {
				code: 0,
				msg: '用户已存在'
			}
			return;
		}
	} catch (err) {
		ctx.body = {
			code: -1,
			msg: '不合格的用户名，应为6位整数'
		}
		return;
	}

	try {
		let newUser = await User_col.create({
			username: username,
			password: password,
			isAdmin: isAdmin
		})
		if (newUser) {
			// console.log(newStu.userId,newStu.username);
			ctx.body = {
				code: 1,
				msg: '注册成功',
				data: {
					username: username,
					password: password,
					isAdmin: isAdmin
				}
			}
		}
	} catch (err) {
		ctx.body = {
			code: 2,
			msg: '不合格的密码'
		}
	}

}
module.exports = {
	login,
	register
}

// 配置文件
module.exports = {
	// koa运行的端口
	port:3000,
	db: 'mongodb://127.0.0.1:27017/project',
	// 加盐的次数===加密的次数
	saltTimes: 3
}

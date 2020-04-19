const Sequelize = require('sequelize')
// const sequelize = new Sequelize('todo', {
// 	server: 'localhost',
// 	authentication: {
// 		type: 'default',
// 		options: {
// 			userName: 'tina',
// 			password: 'Apple509',
// 		},
// 	},
// })

// const sequelize = new Sequelize('todo', 'tina', 'Apple509', {
// 	host: 'localhost',
// 	dialect: 'mssql',
// 	dialectOptions: {
// 		instanceName: 'MSSQLSERVER',
// 		options: {
// 			encrypt: true,
// 		},
// 	},
// })

const sequelize = new Sequelize('sqlite::memory:')

const Todo = sequelize.define(
	'todo',
	{
		identifier: { type: Sequelize.STRING, primaryKey: true },
		incrementMe: { type: Sequelize.INTEGER, autoIncrement: true },
		name: {
			type: Sequelize.STRING,
		},
		isCompleted: {
			type: Sequelize.BOOLEAN,
			field: 'is_completed',
			defaultValue: false,
		},
	},
	{
		freezeTableName: true,
	},
)

;(async () => {
	await sequelize.sync({ force: true })
	await Todo.bulkCreate([
		{ name: 'task1', isCompleted: false },
		{ name: 'task2', isCompleted: true },
		{ name: 'task3', isCompleted: false },
	])
	console.log(await Todo.findAll())
})()

const jwt = require('jsonwebtoken')
const TodosModel = require('../models').todos
const TasksModel = require('../models').tasks
const UsersModel = require('../models').users
const sequelize = require('sequelize')

module.exports = {
  async create (req, res) {
    const token = req.headers['x-access-token']
    const user = jwt.verify(token, process.env.SECRET_KEY)

    const todo = await TodosModel.findOne({
      where: { todoname: req.body.todoName, user_id: user.id }
    })

    if (todo) {
      res.send({ success: false, msg: 'Todo with the same name alerady exist' })
    } else {
      const body = {
        todoname: req.body.todoName,
        user_id: user.id
      }

      const todoCreated = await TodosModel.create(body)
      if (todoCreated) {
        res.send({ success: true, msg: 'Todo added successfully' })
      } else {
        res.send({ success: false, msg: 'Something Went Wrong' })
      }
    }
  },

  async getAll (req, res) {
    const token = req.headers['x-access-token']
    const user = jwt.verify(token, process.env.SECRET_KEY)
    const todos = await TodosModel.findAll({
      attributes: [
        'id',
        'todoname',
        [
          sequelize.literal(`(
            SELECT COUNT(tasks.id)
            FROM tasks
            WHERE tasks.todo_id = todos.id AND completed = true
          )`),
          'completedTasks'
        ],
        [
          sequelize.literal(`(
            SELECT COUNT(tasks.id)
            FROM tasks
            WHERE tasks.todo_id = todos.id
          )`),
          'totalTasks'
        ]
      ],
      where: {
        [sequelize.Op.or]: {
          sharedWith: [user.id],
          user_id: user.id
        }
      }
    })

    res.send({ success: true, data: todos })
  },

  async delete (req, res) {
    await TasksModel.destroy({
      where: {
        todo_id: req.params.id
      }
    })
    await TodosModel.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send({ success: true, msg: 'Todo deleted successfully' })
  },

  async getUsers (req, res) {
    const token = req.headers['x-access-token']
    const user = jwt.verify(token, process.env.SECRET_KEY)
    const users = await UsersModel.findAll({
      where: {
        id: { [sequelize.Op.not]: user.id }
      }
    })
    res.send({ success: true, data: users })
  },

  async shareTodo (req, res) {
    const todo = await TodosModel.findByPk(req.body.todoId)
    const todoSharedWith = todo.sharedWith ? todo.sharedWith : []
    if (todoSharedWith.includes(req.body.user)) {
      res.send({
        success: false,
        msg: 'Todo has been already shared with the user'
      })
    } else {
      todoSharedWith.push(req.body.user)
      const todoShared = await TodosModel.update(
        { sharedWith: todoSharedWith },
        {
          where: {
            id: req.body.todoId
          }
        }
      )
      if (todoShared) {
        res.send({ success: true, msg: 'Todo shared successfully' })
      } else {
        res.send({ success: false, msg: 'Something Went Wrong' })
      }
    }
  }
}

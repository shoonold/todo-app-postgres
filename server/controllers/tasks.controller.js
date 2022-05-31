const TaskModel = require('../models').tasks
const TodoModel = require('../models').todos

module.exports = {
  async create (req, res) {
    const task = await TaskModel.findOne({
      where: {
        description: req.body.description,
        todo_id: req.body.todo_id
      }
    })
    if (task) {
      res.send({
        success: false,
        msg: `Task with the same name alerady exist`
      })
    } else {
      const body = req.body
      body.due_date = req.body.dueDate
      const taskCreated = await TaskModel.create(body)
      if (taskCreated) {
        res.send({ success: true, msg: 'Task added successfully' })
      } else {
        res.send({ success: false, msg: 'Something Went Wrong' })
      }
    }
  },

  async update (req, res) {
    let isExist = false
    if (req.body.oldDescription != req.body.description) {
      isExist = await TaskModel.findOne({
        where: {
          description: req.body.description,
          todo_id: req.body.todo_id
        }
      })
    }

    if (!isExist) {
      const body = req.body
      body.due_date = req.body.dueDate
      const taskUpdate = await TaskModel.update(body, {
        where: { id: req.params.id }
      })
      if (taskUpdate) {
        res.send({ success: true, msg: 'Task updated successfully' })
      } else {
        res.send({ success: false, msg: 'Something Went Wrong' })
      }
    } else {
      res.send({
        success: false,
        msg: `Task with the same name alerady exist`
      })
    }
  },

  async getAll (req, res) {
    const todo = await TodoModel.findByPk(req.params.todoId)
    if (!todo) {
      res.send({ success: false, msg: 'No such todo found' })
    } else {
      const tasks = await TaskModel.findAll({
        where: {
          todo_id: req.params.todoId
        }
      })
      res.send({
        success: true,
        todoName: todo.todoname,
        data: tasks ? tasks : []
      })
    }
  },

  async delete (req, res) {
    const taskDelete = await TaskModel.destroy({
      where: { id: req.params.id }
    })
    if (taskDelete) {
      res.send({ success: true, msg: 'Task deleted successfully' })
    } else {
      res.send({ success: false, msg: 'Something Went Wrong' })
    }
  }
}

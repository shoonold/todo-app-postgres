const moment = require('moment')
module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('tasks', {
    description: {
      type: Sequelize.STRING
    },
    todo_id: {
      type: Sequelize.INTEGER
    },
    due_date: {
      type: Sequelize.DATE,
      get () {
        return this.getDataValue('due_date')
          ? moment(this.getDataValue('due_date')).format('DD/MM/YYYY h:mm:ss')
          : ''
      }
    },
    priority: {
      type: Sequelize.STRING
    },
    completed: {
      type: Sequelize.BOOLEAN
    }
  })
  return Task
}

module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define('todos', {
    todoname: {
      type: Sequelize.STRING
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    sharedWith: {
      type: Sequelize.ARRAY(Sequelize.INTEGER)
    }
  })
  return Todo
}

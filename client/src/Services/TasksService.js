import axios from '../Axios/AxiosInstance'

function create (body) {
  return axios.post(`/task/create`, body)
}

function getAll (todoId) {
  return axios.get(`/tasks/get-tasks/${todoId}`)
}

function deleteTask (id) {
  return axios.delete(`/task/delete/${id}`)
}

function update (body, id) {
  return axios.put(`task/update/${id}`, body)
}

export default { create, getAll, deleteTask, update }

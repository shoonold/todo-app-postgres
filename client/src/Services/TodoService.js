import axios from '../Axios/AxiosInstance'

function create (body) {
  return axios.post('/todo/create', body)
}

function getAll () {
  return axios.get(`/todo/get-todos`)
}

function deleteTodo (id) {
  return axios.delete(`/todo/delete-todo/${id}`)
}

function fetchUsers () {
  return axios.post(`/todo/get-users`)
}

function shareTodo (body) {
  return axios.post(`/todo/share-todo`, body)
}

export default { create, getAll, deleteTodo, fetchUsers, shareTodo }

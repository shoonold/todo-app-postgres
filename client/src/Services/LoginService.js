import axios from '../Axios/AxiosInstance'

function login (body) {
  return axios.post('/login', body)
}
export default { login }

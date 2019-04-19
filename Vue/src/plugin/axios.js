import axios from "axios"
import store from '@/store'
const Axios = axios.create({
  baseURL: `${process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3000' : './'}`,
  timeout: 5000,
  responseType: "json",
  withCredentials: true
})


Axios.interceptors.request.use(config => {
  store.state.user.token && (config.headers['token'] = store.state.user.token)
  return config
})

export default Axios
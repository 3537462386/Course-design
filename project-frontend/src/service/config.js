import axios from 'axios'
// axios配置
axios.defaults.baseURL ='http://localhost:3000'
axios.interceptors.response.use(res => {
    return res.data
})

export default axios

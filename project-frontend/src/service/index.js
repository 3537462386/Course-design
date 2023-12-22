import axios  from "./config";

// 使用请求方法
export const login = (params) => {
    return axios.post('/login', params)
}
export const register = (params) => {
    return axios.post('/register', params)
}

export const getAll = (params) => {
    return axios.post('/getAll', params)
}
export const updatestudent = (params) => {
    return axios.post('/updatestudent', params)
}
export const addstudent = (params) => {
    return axios.post('/addstudent', params)
}
export const deletestudent = (params) => {
    return axios.post('/deletestudent', params)
}
export const getbystudentid = (params) => {
    return axios.post('/getbystudentid', params)
}
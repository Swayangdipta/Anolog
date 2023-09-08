import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const login = data => {
    return axios.post(`http://localhost:9000/api/auth/login`,data)
    .then(response => response.data)
    .catch(e => e)
}

export const register = data => {
    return axios.post(`http://localhost:9000/api/auth/register`,data)
    .then(response => response.data)
    .catch(e => e)
}

export const logout = () => {
    return axios.get(`http://localhost:9000/api/auth/logout`)
    .then(response => response.data)
    .catch(e => e)
}
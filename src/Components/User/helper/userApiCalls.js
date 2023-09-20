import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const getUserBlogs = (userId,token) => {
    return axios.post(`${backend}/user/blogs/${userId}`,{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
    .catch(e => e)
}

export const getUserRole = (userId,token) => {
    return axios.post(`${backend}/user/role/${userId}`,{},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
    .catch(e => e)
}

export const getUser = (userId,token,password) => {
    return axios.post(`${backend}/user/${userId}`,password,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
    .catch(e => e)
}

export const updatedUserInformation = (userId,token,data) => {
    return axios.put(`${backend}/user/${userId}`,data,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
    .catch(e => e)
}
import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const getBlogs = (limit = "10",pageNumber = "1") => {
    return axios.get(`${backend}/blogs?limit=${limit}&page=${pageNumber}`).then(response => response.data).catch(e => e)
}

export const getBlogsCount = () => {
    return axios.get(`${backend}/blogs/count`).then(response => response.data).catch(e => e)
}

export const getCategories = () => {
    return axios.get(`${backend}/api/categories`).then(response => response.data).catch(e => e)
}

export const getUserLikes = userId => {
    return axios.get(`${backend}/user/likes/${userId}`).then(response => response.data).catch(e => e)
}

export const searchBlog = query => {
    return axios.post(`${backend}/blog/s`,{query: query}).then(response => response.data).catch(e => e)
}
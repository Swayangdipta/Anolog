import axios from "axios"

const backend = process.env.REACT_APP_BACKEND

export const publishBlog = (data,userId,token) => {
    return axios.post(`${backend}/blog/create/${userId}`,data,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
    .catch(e => e)
}

export const getBlog = blogId => {
    return axios.get(`${backend}/blog/${blogId}`)
    .then(response => response.data)
    .catch(e => e)
}

export const likeBlog = (blogId,userId,token,type) => {
    return axios.post(`${backend}/blogs/like/${blogId}/${userId}`,{
        type: type
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.data)
    .catch(e => e)
}

export const increaseBlogViews = (blogId) => {
    return axios.get(`${backend}/blog/view/increase/${blogId}`)
    .then(response => response.data)
    .catch(e => e)
}

export const addComment = (comment,userId,token,blogId) => {
    return axios.post(`${backend}/blog/comment/add/${blogId}/${userId}`,{comment},{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => response.data).catch(e => e)
}

export const getComments = (blogId,count) => {
    return axios.get(`${backend}/blog/comments/${blogId}?count=${count}`)
    .then(response => response.data)
    .catch(e => e)
}

export const createReport = (report,userId,token) => {
    return axios.post(`${backend}/report/${userId}`,report,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => response.data).catch(e => e)
}
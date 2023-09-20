import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { getUserBlogs } from './helper/userApiCalls'
import { isAuthenticated } from '../../utils/LS_Helper'
import { toast } from 'react-toastify'
import BlogCard from '../Blog/BlogCard'

const MyBlogs = () => {
    const [myBlogs,setMyBlogs] = useState([])

    const {user,token} = isAuthenticated()

    useEffect(()=>{
        getUserBlogs(user._id,token).then(data => {
            if(data.response?.data.error){
                return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                return toast.error('Faild to load your blogs!')
            }
            setMyBlogs(data.data)
        })
    },[])
  return (
    <Base>
        <div className='w-[90vw] h-max py-4 mx-auto mt-[70px] flex flex-col md:grid md:grid-cols-2 gap-[20px]'>
            {
                myBlogs.length > 0 ? myBlogs.map((blog,index) => (
                    <BlogCard isUpdateable={true} blog={blog} key={index} />
                )) : ''
            }            
        </div>
    </Base>
  )
}

export default MyBlogs
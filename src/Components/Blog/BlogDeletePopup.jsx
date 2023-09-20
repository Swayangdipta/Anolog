import React, { useEffect, useState } from 'react'
import { RiCloseFill, RiLoader3Fill } from 'react-icons/ri'
import { deleteBlog, getBlog } from './helper/blogHelper'
import { isAuthenticated } from '../../utils/LS_Helper'
import { toast } from 'react-toastify'

const BlogDeletePopup = ({setIsConfirmationOpen= f => f, blogId, blogTitle}) => {
    const [confirmed,setConfirmed] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [blog,setBlog] = useState(undefined)

    const {user,token} = isAuthenticated()

    const handleDelete = ev => {
        setIsLoading(true)
        if(blog){
            deleteBlog(user._id,token,blogId,blog.category._id).then(data => {
                if(data.response?.data.error){
                    setIsLoading(false)
                  return toast.error(data.response.data.message[0])
                }else if(data.name === 'AxiosError'){
                    setIsLoading(false)
                  return toast.error("Faild to delete blog!")
                }
                
                setIsLoading(false)
                toast.success('Blog Deleted Successfully!')
                setIsConfirmationOpen(false)
              }).catch(err => {
                setIsLoading(false)
                return toast.error("Something went wrong!")
              })
        }
    }

    useEffect(()=>{
        getBlog(blogId).then(data => {
            if(data.response?.data.error){
              return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
              return toast.error("Faild to load blog!")
            }
    
            setBlog(data.data)
          })
    },[])
  return (
    <div className='w-screen h-screen bg-[#00000070] fixed top-0 left-0 z-[9999999999] flex items-center justify-center'>
        <div className='w-[300px] md:w-[450px] min-h-[250px] h-max p-6 rounded bg-rose-700 relative top-0'>
            <div className='absolute top-[-20px] right-[-20px] text-[40px] w-[40px] h-[40px] bg-zinc-100 rounded cursor-pointer' onClick={e => setIsConfirmationOpen(false)}><RiCloseFill /></div>
            <p className='text-zinc-100 font-[600] text-[18px]'>The Following blog will be deleted upon confirmation!</p>
            <p className='text-gray-300 mt-2'>Blog</p>
            <p className='text-zinc-100 font-[600] text-[22px] underline'>{blogTitle}</p>

            <div className='mt-4'>
                <p className='text-gray-200 text-[18px]'>Are you sure?</p>
                {
                    confirmed ? (
                        <button className='w-full h-[40px] rounded bg-zinc-900 text-zinc-100 shadow-lg hover:shadow-none mt-2 cursor-pointer' disabled={isLoading} onClick={handleDelete}>{isLoading ? (<RiLoader3Fill className='animate-spin mx-auto text-[26px]' />) : 'Delete Now'}</button>
                    ) : (
                        <div className='mt-2 w-full flex items-center justify-between gap-[20px]'>
                            <button className='w-full h-[40px] rounded bg-zinc-100 shadow-lg hover:shadow-none cursor-pointer' onClick={e=>setConfirmed(true)}>Yes</button>
                            <button className='w-full h-[40px] rounded bg-zinc-900 shadow-lg text-zinc-100 hover:shadow-none cursor-pointer' onClick={e=>setIsConfirmationOpen(false)}>No</button>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default BlogDeletePopup
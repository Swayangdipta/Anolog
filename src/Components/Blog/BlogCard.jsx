import React, { useState } from 'react'
import {AiFillEye, AiFillHeart, AiFillMessage} from 'react-icons/ai'
import { FaPen } from 'react-icons/fa'
import { RiDeleteBin2Fill,RiShareForwardFill } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import BlogDeletePopup from './BlogDeletePopup'
import { toast } from 'react-toastify'

const BlogCard = ({blog,isUpdateable = false}) => {
    const [isConfirmationOpen,setIsConfirmationOpen] = useState(false)
    const [isCopied,setIsCopied] = useState(false)

    const copyToClipboard = ev => {
        if(navigator.clipboard){
          navigator.clipboard.writeText(`http://localhost:3000/blog/${blog._id}`)
          setIsCopied(true)
          return toast.success('Link Copied!')
        }
    
        return false
      }
  return (
    <div className="relative top-0 w-full">
    <Link to={`/blog/${blog._id}`} className='w-full md:w-[80%]'>
        <div className='w-full m-auto h-max rounded cursor-pointer bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border-[1px] border-zinc-700 hover:shadow-2xl hover:border-green-400'>
            <div className="relative w-[full] pb-[50.25%]">
                <img src={blog.coverImage} alt={blog.title} className='absolute inset-0 w-full h-full object-cover rounded-t ' />
            </div>
            <div className='w-full h-max p-[10px] bg-black rounded-b'>
                <div className='w-full h-[62px] relative top-0 text-zinc-100'>
                    <h4 className='w-full h-full text-zinc-400 leading-[20px] text-[20px] text-ellipsis overflow-hidden'>{blog.title}</h4>
                </div>
                <div className='w-full h-[30px] rounded-b flex items-center justify-between'>
                    <span className='text-violet-700 text-[22px] flex items-center gap-[5px]'>
                        <AiFillHeart />
                        <p className='text-[12px]'>{blog.likes}</p>
                    </span>

                    <span className='text-violet-700 text-[22px] flex items-center gap-[5px]'>
                        <AiFillMessage />
                        <p className='text-[12px]'>{blog.commentCount}</p>
                    </span>

                    <span className='text-violet-700 text-[22px] flex items-center gap-[5px]'>
                        <AiFillEye />
                        <p className='text-[12px]'>{blog.views ? blog.views : 0}</p>
                    </span>
                </div>
            </div>
        </div>
    </Link>
    {
        isUpdateable && (<div className='w-[30px] h-[30px] absolute top-[10px] right-[10px] rounded shadow-lg'>
            <Link to={`/update/${blog._id}`}>
                <div className='w-full bg-amber-500 cursor-help hover:shadow-none h-full flex items-center justify-center rounded'><FaPen /></div>
            </Link>
            <div className='w-full bg-rose-700 text-zinc-100 cursor-help hover:shadow-none h-full flex items-center justify-center rounded mt-[10px]' onClick={e => setIsConfirmationOpen(true)}><RiDeleteBin2Fill /></div>
            <div className=' mt-[10px] group flex items-center justify-center'>
                  <button className='w-[25px] h-[25px] md:w-[30px] w-[25px] h-[25px] md:h-[30px] rounded bg-zinc-100 shadow-lg flex items-center justify-center' onClick={copyToClipboard}>{isCopied ? (<TiTick className='text-[14px] sm:text-[24px] text-emerald-700' />) : (<RiShareForwardFill className='text-[19px] sm:text-[24px] text-orange-700' />)}</button>
                  <div className='p-2 rounded bg-black absolute bottom-[-50px] text-zinc-300 hidden group-hover:block'>Share</div>
            </div>
        </div>)
    }
    {
        isConfirmationOpen && (<BlogDeletePopup setIsConfirmationOpen={setIsConfirmationOpen} blogId={blog._id} blogTitle={blog.title} />)
    }
    </div>
  )
}

export default BlogCard
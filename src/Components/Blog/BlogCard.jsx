import React from 'react'
import {AiFillEye, AiFillHeart, AiFillMessage} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const BlogCard = ({blog}) => {
  return (
    <Link to={`/blog/${blog._id}`} className='w-[80%]'>
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
  )
}

export default BlogCard
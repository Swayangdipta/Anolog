import React, { useState } from 'react'
import {AiFillEye, AiFillHeart} from 'react-icons/ai'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserAnalytics = ({blogs,counts,topBlogs}) => {
  const [isBlogwiseOpen,setIsBlogwiseOpen] = useState(false)
  return (
    <div className='w-full min-h-[200px] h-max p-4 bg-zinc-900 mt-[40px] rounded relative top-0'>
        <h1 className='absolute top-[0px] right-[10px] text-[#eeeeee20] text-[24px]'>Analytics</h1>
        {
            blogs.length === 0 ? (
                <h1 className='text-zinc-300 text-center mt-[70px]'>Write some blogs to see the analytics.</h1>
            ) : (
              <div className='w-full h-full flex flex-wrap items-center justify-evenly '>
                  <div className='w-[180px] h-[180px] bg-gradient-to-r from-rose-500 to-violet-500 rounded-full mx-auto flex items-center justify-center'>
                    <div className='w-[170px] h-[170px] rounded-full bg-zinc-800 flex flex-col items-center justify-center gap-[10px]'>
                      <h1 className='text-[34px] font-[600] text-rose-500'>{counts.likes}</h1>
                      <h3 className='text-[20px] font-[600] text-rose-500 flex items-center gap-[10px]'><AiFillHeart /> Likes</h3>
                    </div>
                  </div>
                  <div className='w-[180px] h-[180px] bg-gradient-to-r from-amber-500 to-violet-500 rounded-full mx-auto flex items-center justify-center'>
                    <div className='w-[170px] h-[170px] rounded-full bg-zinc-800 flex flex-col items-center justify-center gap-[10px]'>
                      <h1 className='text-[34px] font-[600] text-amber-500'>{counts.views}</h1>
                      <h3 className='text-[20px] font-[600] text-amber-500 flex items-center gap-[10px]'><AiFillEye /> Views</h3>
                    </div>
                  </div>
                  
                  <div className='w-[180px] h-[180px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mx-auto flex items-center justify-center group'>
                  <Link to={`/blog/${topBlogs.byLike._id}`}>
                    <div className='w-[170px] h-[170px] rounded-full bg-zinc-800 flex flex-col items-center justify-center gap-[10px] relative top-0'>
                      <img src={topBlogs.byLike.coverImage} alt="Most Liked Blog" className='w-full h-full object-fit rounded-full' />
                      <div className='h-0 w-0 group-hover:h-full group-hover:w-[170px] absolute bottom-0 overflow-hidden duration-500 group-hover:p-4 rounded-full bg-zinc-800 flex items-center justify-center text-center text-zinc-300'>{topBlogs.byLike.title}</div>
                      <div className='absolute top-[0px] left-[-30px] bg-rose-700 rotate-[320deg] px-4 py-2 rounded text-zinc-300'>
                        Most Likes
                      </div>
                    </div>
                    </Link>
                  </div>

                  <div className='w-[180px] h-[180px] bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full mx-auto flex items-center justify-center group'>
                  <Link to={`/blog/${topBlogs.byView._id}`}>
                    <div className='w-[170px] h-[170px] rounded-full bg-zinc-800 flex flex-col items-center justify-center gap-[10px] relative top-0'>
                      <img src={topBlogs.byView.coverImage} alt="Most Liked Blog" className='w-full h-full object-fit rounded-full' />
                      <div className='h-0 w-0 group-hover:h-full group-hover:w-[170px] absolute bottom-0 overflow-hidden duration-500 group-hover:p-4 rounded-full bg-zinc-800 flex items-center justify-center text-center text-zinc-300'>{topBlogs.byView.title}</div>
                      <div className='absolute top-[0px] left-[-30px] bg-amber-700 rotate-[320deg] px-4 py-2 rounded text-zinc-300'>
                        Most Views
                      </div>
                    </div>
                    </Link>
                  </div>
              </div>
            )
        }
        <div className='absolute bottom-[-40px] rounded-b px-4 py-2 bg-black text-zinc-400 flex items-center gap-[10px] cursor-pointer' onClick={e=>setIsBlogwiseOpen(!isBlogwiseOpen)}>
          {
            isBlogwiseOpen ? (<>Close Blog Wise Analysis <FaArrowUp /></>) : (<>View Blog Wise Analysis <FaArrowDown /></>)
          }
        </div>
    </div>
  )
}

export default UserAnalytics
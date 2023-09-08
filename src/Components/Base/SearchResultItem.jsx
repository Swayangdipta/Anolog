import React from 'react'
import { Link } from 'react-router-dom'

const SearchResultItem = ({blog}) => {
  return (
    <Link to={`/blog/${blog._id}`}>
    <div className="w-[calc(100%_-_15px)] h-[80px] flex items-center gap-[20px] rounded bg-gray-800 mb-[10px] cursor-pointer hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 p-[2px]">
        <div className="relative w-[133px] pb-[75px]">
            <img src={blog.coverImage} alt={blog.title} className='absolute inset-0 w-full h-full object-cover rounded ' />
        </div>

        <div className='w-[calc(100%_-_163px)] h-full overflow-hidden'>
            <h4 className='text-[19px] text-gray-300 w-full h-[40%] truncate mb-[5px]'>{blog.title}</h4>
            <p className='text-[14px] text-gray-500 '>{blog.description}</p>
        </div>
    </div>
    </Link>
  )
}

export default SearchResultItem
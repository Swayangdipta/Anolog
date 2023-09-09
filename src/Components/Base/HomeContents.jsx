import React, { useContext, useEffect, useState } from 'react'
import { getBlogs, getBlogsCount } from './helper/baseApiCalls'
import { toast } from 'react-toastify'
import BlogCard from '../Blog/BlogCard'
import { BlogContext } from '../../context/BlogContext'
import { FiltersContext } from '../../context/FiltersContext'

const HomeContents = () => {
    const [blogs,setBlogs] = useContext(BlogContext)
    const [filters,setFilters] = useContext(FiltersContext)
    const [pageNumber,setPageNumber] = useState(1)
    const [totalPages,setTotalPages] = useState(1)
    const [numbersToDisplay,setNumberToDispaly] = useState([1,2,3,4])

    useEffect(()=> {
        getBlogsCount().then(data => {
            if(data.response?.data.error){
                return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                return toast.error('Some error occured.Try again.')
            }
            let total = Math.ceil(data.data / 10)
            setTotalPages(total)
            if(total < 4){
                let numbers = []
                for (let index = 1; index <= total; index++) {
                    numbers.push(index)
                }
                setNumberToDispaly(numbers)
            }
        })
    },[])

    useEffect(()=>{
        if(pageNumber === numbersToDisplay[3]){
            let numbers = []
            for (let index = pageNumber; index <= pageNumber + 3; index++) {
                numbers.push(index)
            }
            setNumberToDispaly(numbers)
        }

        getBlogs("10",pageNumber).then(data => {
            if(data.response?.data.error){
                return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                return toast.error('Something went wrong! Try again.')
            }

            setBlogs(data.data)
        }).catch(e=> console.log(e))
    },[pageNumber])
  return (
    <div className='w-full min-h-[80vh] h-max flex gap-[30px] justify-between'>
        <div className='w-[300px] hidden md:block'></div>
        <div className='w-[95%] mx-auto md:mx-0 md:w-[calc(100%_-_400px)] flex flex-col justify-center items-center gap-[20px] relative top-0 pb-[70px]'>
            {
                blogs.length > 0 && blogs.map((blog,index) => (
                    <BlogCard blog={blog} key={index} />
                ))
            }
            {
                blogs.length > 0 && (
                <div id='pagination' className='flex gap-4 absolute bottom-2'>
                    {numbersToDisplay.map((num,index) => (
                        <div key={index} onClick={e=>setPageNumber(num)} className={`w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer ${num === pageNumber ? 'bg-rose-700 text-zinc-100' : 'bg-zinc-100'}`}>{num}</div>
                    ))}
                    {
                        totalPages > 5 && (<div className='text-zinc-100'>...</div>)
                    }
                    {
                        totalPages > 6 && (
                            <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center cursor-pointer ${pageNumber === totalPages ? 'bg-rose-700 text-zinc-100' : 'bg-zinc-100'}`}>{totalPages}</div>
                        )
                    }
                </div>                    
                )
            }


        </div>
        <div className='w-[60px] hidden md:block'></div>
    </div>
  )
}

export default HomeContents
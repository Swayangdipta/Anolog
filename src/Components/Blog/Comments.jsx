import React, { useState } from 'react'
import { FaComment } from 'react-icons/fa'
import { RiLoader3Fill } from 'react-icons/ri'
import { MdReport } from 'react-icons/md'
import { getComments } from './helper/blogHelper'
import { toast } from 'react-toastify'

const Comments = ({blogId,report,setIsReportOpen=f=>f,setReport=f=>f}) => {
    const [isLoading,setIsLoading] = useState(false)
    const [noComments,setNoComments] = useState(false)
    const [comments,setComments] = useState([])
    const [count,setCount] = useState(0)
    const [moreLoadable,setMoreLoadable] = useState(true)

    const loadComments = ev => {
        setNoComments(false)
        getComments(blogId,count).then(data => {
            if(data.response?.data.error){
                setIsLoading(false)
                return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                setIsLoading(false)
                return toast.error('Faild to add comment!')
            }

            if(data.data.length === 0){
                setNoComments(true)
                setMoreLoadable(false)
            }

            if(data.data.length < 10){
                setMoreLoadable(false)
            }

            setComments(prev => [...prev,...data.data])
            setIsLoading(false)
            setCount(count + 10)
        })
    }

    const getDate = date => {
        const dateInUTC = new Date(date)
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }
        const dateInIst = new Date(dateInUTC.getTime())

        const formatter = Intl.DateTimeFormat('en-IN',options)

        return formatter.format(dateInIst)
    }

  return (
    <div className='w-[90vw] min-h-[100px] h-max p-4 rounded bg-gray-900 mx-auto mt-[40px]'>
        {
            noComments ? (<h2 className='w-max text-zinc-300 underline flex items-center mx-auto mt-[20px]'>No comments found.</h2>) : 
            comments.length === 0 ? (
                <button className='w-max text-zinc-300 underline flex items-center mx-auto mt-[20px]' disabled={isLoading} onClick={loadComments}>{isLoading ? (<>Loading<RiLoader3Fill className='animate-spin ml-2' /></>) : (<>Load Comments <FaComment className='ml-2' /></>)}</button>
            ) : comments.map((comment,index) => (
                <div className='w-full flex gap-[20px] mb-4 relative top-0' key={index}>
                    <div className='absolute top-[5px] right-[5px] group flex items-center justify-center'>
                        <button className='w-max h-max rounded-full flex items-center justify-center' onClick={e=>{
                            setReport({type: 'Comment',id: comment.id,comment:comment})
                            setIsReportOpen(true)
                        }}><MdReport className='text-[26px] text-rose-600' /></button>
                        <div className='p-2 w-max rounded bg-rose-700 absolute bottom-[-40px] right-0 text-zinc-300 hidden group-hover:block'>Report Comment</div>
                    </div>
                    <div className='w-[50px] h-[50px] p-2 bg-black rounded-full'>
                        <img className='w-full h-full object-cover rounded-full' src={comment.authorImage} alt="Annonymous" />
                    </div>
                    <div className='w-full h-max p-2 rounded bg-gray-800'>
                        <h1 className='text-[18px] text-emerald-500'>Annonymous</h1>
                        <p className='text-zinc-300 font-[300]'>{comment.comment}</p>
                        <p className='mt-2 text-zinc-500'>{getDate(comment.createdAt)}</p>
                    </div>
                </div>
            ))
        }
        {    
            moreLoadable && comments.length > 0 && (<button className='w-max text-zinc-300 underline flex items-center mx-auto mt-[20px]' disabled={isLoading} onClick={loadComments}>{isLoading ? (<>Loading<RiLoader3Fill className='animate-spin ml-2' /></>) : (<>Load More</>)}</button>)
        }
    </div>
  )
}

export default Comments
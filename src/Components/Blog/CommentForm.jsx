import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { addComment } from './helper/blogHelper'
import { isAuthenticated } from '../../utils/LS_Helper'
import { RiLoader3Fill } from 'react-icons/ri'

const CommentForm = ({blogId}) => {
    const [comment,setComment] = useState('')
    const [isLoading,setIsLoading] = useState(false)
    const {user,token} = isAuthenticated()
    const handleComment = ev => {
        ev.preventDefault()
        setIsLoading(true)
        if(comment !== ''){
            addComment(comment,user._id,token,blogId).then(data => {
                if(data.response?.data.error){
                    setIsLoading(false)
                    return toast.error(data.response.data.message[0])
                }else if(data.name === 'AxiosError'){
                    setIsLoading(false)
                    return toast.error('Faild to add comment!')
                }

                setComment('')
                setIsLoading(false)
                return toast.success('Comment added.')
            })
        }else{
            setIsLoading(false)
            return toast.error('Can not post empty comment!')
        }
    }
  return (
    <form className='w-full min-h-[100px] mt-[50px] rounded bg-zinc-900 p-4'>
        <h1 className='text-zinc-500 text-[26px] dotted'>Comment</h1>
        <textarea onChange={e => setComment(e.target.value)} value={comment} type="text" className='w-full h-[100px] resize-none rounded p-2 mt-4 bg-zinc-700 text-zinc-200' placeholder='Share your thoughts...' />
        <div className='w-full flex justify-end'>
            <button disabled={isLoading} onClick={handleComment} className='w-[150px] h-[40px] rounded bg-green-700 hover:bg-green-800 text-zinc-100 font-[600] ml-auto'>{isLoading ? (<RiLoader3Fill className='text-[24px] mx-auto animate-spin' />) : 'Comment'}</button>
        </div>
    </form>
  )
}

export default CommentForm
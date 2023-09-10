import React, {useContext, useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBlog, increaseBlogViews, likeBlog } from './helper/blogHelper'
import { toast } from 'react-toastify'
import parse from 'html-react-parser'
import Base from '../Base/Base'
import { BsIncognito } from 'react-icons/bs'
import { TiTick } from 'react-icons/ti'
import { MdReport } from 'react-icons/md'
import { RiHeartFill, RiHeartLine, RiLoader3Fill, RiShareForwardFill } from 'react-icons/ri'
import { isAuthenticated } from '../../utils/LS_Helper'
import { UserContext } from '../../context/UserContext'
import CommentForm from './CommentForm'
import Comments from './Comments'
import { FiltersContext } from '../../context/FiltersContext'
import ReportForm from './ReportForm'

const Blog = () => {
  const [blog,setBlog] = useState(undefined)
  const [liked,setLiked] = useState(false)
  const [isCopied,setIsCopied] = useState(false)
  const [isLoading,setIsloading] = useState(false)
  const [isReportOpen,setIsReportOpen] = useState(false)
  const [report,setReport] = useState({
    type: 'blog',
    id: ''
  })
  const {blogId} = useParams()
  const [userInfo,setUserInfo] = useContext(UserContext)
  const [filters,setFilters] = useContext(FiltersContext)

  const {user,token}  = isAuthenticated()

  const handleLike = ev => {
    if(user && token){
      setIsloading(true)
      const type = liked ? 'dislike' : 'like'

      likeBlog(blogId,user._id,token,type).then(data => {
        if(data.response?.data.error){
          setIsloading(false)
          return toast.error(data.response.data.message[0])
        }else if(data.name === 'AxiosError'){
          setIsloading(false)
          return toast.error('like/dislike not captured')
        }
        setIsloading(false)
        setLiked(!liked)
      }).catch(err => {
        setIsloading(false)
        return toast.error('Something went wrong!')
      })      
    }else{
      return toast.error("You need to login to like.")
    }
  }

  const copyToClipboard = ev => {
    if(navigator.clipboard){
      navigator.clipboard.writeText(`http://localhost:3000/blog/${blog._id}`)
      setIsCopied(true)
      return toast.success('Link Copied!')
    }

    return false
  }

  useEffect(() => {
    if(blogId){
      getBlog(blogId).then(data => {
        if(data.response?.data.error){
          return toast.error(data.response.data.message[0])
        }else if(data.name === 'AxiosError'){
          return toast.error("Faild to load blog!")
        }

        setBlog(data.data)
      })
    }
  },[blogId])

  useEffect(() => {
    if(blog){
      document.title = blog.title
      let newMetaData = document.createElement('meta')
      newMetaData.setAttribute('name','description')
      newMetaData.setAttribute('content',blog.description)

      document.head.appendChild(newMetaData)

      if(userInfo.likes.hasOwnProperty(blog._id)){
        setLiked(true)
      }

      increaseBlogViews(blogId).then(data => {
        if(data.response?.data.error || data.name === 'AxiosError'){
          return
        }

        return
      }).catch(e => console.log(e))

    }
  },[blog])

  return (
    <Base>
    <div autoFocus className={`w-screen sm:w-[90vw] mx-auto mt-[80px] min-h-screen h-max p-[30px] sm:rounded-md border-[1px] border-zinc-700 bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl ${filters.theme === 'dark' ? 'bg-opacity-20' : 'bg-opacity-60'}`}>
      {
        blog ? (
          <div>
            <div className="relative top-0 w-[full] pb-[50.25%]">
                <img src={blog.coverImage} alt={blog.title} className='absolute inset-0 w-full h-full object-cover rounded ' />
                <div className='absolute bottom-[10px] right-[50px] group flex items-center justify-center'>
                  <button className='w-[25px] h-[25px] md:w-[40px] w-[25px] h-[25px] md:h-[40px] rounded-full bg-zinc-100 shadow-lg flex items-center justify-center' onClick={handleLike} disabled={isLoading}>{isLoading ? (<RiLoader3Fill className='text-[19px] sm:text-[24px] text-rose-700 animate-spin' />) : liked ? (<RiHeartFill className='text-[19px] sm:text-[24px] text-rose-700' />) : (<RiHeartLine className='text-[24px] text-rose-700' />)}</button>
                  <div className='p-2 rounded bg-black absolute bottom-[-50px] text-zinc-300 hidden group-hover:block'>{liked ? 'Dislike' : 'Like'}</div>
                </div>
                <div className='absolute bottom-[10px] right-[10px] group flex items-center justify-center'>
                  <button className='w-[25px] h-[25px] md:w-[40px] w-[25px] h-[25px] md:h-[40px] rounded-full bg-zinc-100 shadow-lg flex items-center justify-center' onClick={copyToClipboard}>{isCopied ? (<TiTick className='text-[19px] sm:text-[24px] text-emerald-700' />) : (<RiShareForwardFill className='text-[19px] sm:text-[24px] text-orange-700' />)}</button>
                  <div className='p-2 rounded bg-black absolute bottom-[-50px] text-zinc-300 hidden group-hover:block'>Share</div>
                </div>
                <div className='absolute top-[10px] right-[10px] group flex items-center justify-center' onClick={e=>{
                  setReport({type: 'Blog',id: blog._id})
                  setIsReportOpen(true)
                }}>
                  <button className='w-[25px] h-[25px] md:w-[40px] w-[25px] h-[25px] md:h-[40px] rounded-full bg-zinc-100 shadow-lg flex items-center justify-center'><MdReport className='text-[19px] sm:text-[24px] text-rose-900' /></button>
                  <div className='p-2 w-max rounded bg-rose-700 absolute left-[-120px] text-zinc-300 hidden group-hover:block'>Report Blog</div>
                </div>
            </div>
            <h1 className='mt-[20px] text-zinc-100 text-[28px] sm:text-[40px]'>{blog.title}</h1>
            <span className='flex items-center gap-[40px]'>
              <span className='flex items-center gap-[10px] text-zinc-400'>
                {blog.author && blog.author.profilePicture ? (
                  <>
                    <img className='w-[40px] h-[40px] rounded-full bg-black' src={blog.author.profilePicture} alt="" />
                    <Link href={`/blogs/u/${blog.author._id}`} className='underline'>Anonymous</Link>
                  </>
                ) : (
                  <>
                    <span className='w-[30px] h-[30px] rounded-full flex items-center justify-center bg-zinc-400 text-zinc-900 text-[20px]'><BsIncognito /></span>
                    <h4>Anonymous</h4>
                  </>
                )}
              </span>
              {
                blog.category && (<p className='text-zinc-200 py-[1px] px-2 rounded bg-sky-800'>{blog.category.name}</p>)
              }              
            </span>

              <div className='blogBody mt-[20px] sm:mt-[50px]'>
                {
                  parse(blog.blog)
                }
              </div>

              <CommentForm blogId={blog._id} />
          </div>
        ) : (<h1 className="text-center text-zinc-400">Loading...</h1>)
      }
    </div>

    {
      blog && (<Comments blogId={blog._id} setIsReportOpen={setIsReportOpen} setReport={setReport} />)
    }

    {
      isReportOpen && (<ReportForm report={report} setIsReportOpen={setIsReportOpen} />)
    }
    
    </Base>
  )
}

export default Blog
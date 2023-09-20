import React, { useEffect, useRef, useState } from 'react'
import { isAuthenticated } from '../../utils/LS_Helper'
import { RiLoader3Fill } from 'react-icons/ri'
import {AiFillEye, AiFillHeart} from 'react-icons/ai'
import { getUser, getUserBlogs } from './helper/userApiCalls'
import { toast } from 'react-toastify'
import { FaArrowLeft, FaPen } from 'react-icons/fa'
import Register from '../Auth/Register'
import UserAnalytics from './UserAnalytics'

const UserDashboard = () => {
    const [userData,setUserData] = useState(undefined)
    const [blogs,setBlogs] = useState([])
    const [counts,setCounts] = useState({likes: 0,views: 0})
    const [topBlogs,setTopBlogs] = useState({byLike: {},byView: {}})
    const [isEditOpen,setIsEditOpen] = useState(false)
    const passwordRef = useRef(null)
    const [isLoading,setIsLoading] = useState(false)
    const {user,token} = isAuthenticated()

    const handleAccess = ev => {
        ev.preventDefault()
        setIsLoading(true)
        const password = {
            password: passwordRef.current.value
        }

        if(password.password.length < 8){
            setIsLoading(false)
            return toast.error('Invalid password!')
        }

        getUser(user._id,token,password).then(data=>{
            if(data.response?.data.error){
                setIsLoading(false)
                return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                setIsLoading(false)
                return toast.error('Faild to get information!')
            }

            setUserData(data.data)
            setIsLoading(false)
          })
    }

    useEffect(() => {
        getUserBlogs(user._id,token).then(data => {
            if(data.response?.data.error){
                return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                return toast.error('Faild to load your blogs!')
            }
            let likes = 0, views = 0,byLike = data.data[0],byView = data.data[0]
            
            data.data.forEach( blog => {
                likes += blog.likes
                views += blog.views

                if(blog.likes >= byLike.likes){
                    byLike = blog
                }

                if(blog.views >= byLike.views){
                    byView = blog
                }
            })

            setCounts({likes: likes,views: views})
            setTopBlogs({...topBlogs,byView: byView,byLike: byLike})
            setBlogs(data.data)
        })
    },[])
  return (
    <div className='w-[95vw] min-h-[80vh] h-max mx-auto mt-[90px] p-4 rounded bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20'>
        {/* Basic User Information */}
        <div className='w-full h-[200px] p-2 rounded bg-black relative top-0 overflow-hidden flex gap-[30px]'>
            <h1 className='absolute top-[0px] right-[10px] text-[#eeeeee20] text-[30px]'>Profile</h1>

            <div className='md:w-max h-full ml-[30px] flex flex-col items-center justify-center'>
                <img src={user.profilePicture} alt="" className='w-max h-[160px] object-fit' />
                <h1 className='text-zinc-300 text-[22px]'>{user.username}</h1>
            </div>

            {
                userData ? (
                    <div className='w-full h-full rounded bg-[#111] p-2'>
                        <h1 className='text-zinc-300 text-[30px]'>{userData.name}</h1>
                        <h3 className='text-zinc-400 text-[20px] mt-2'>{userData.email}</h3>
                        <div className='flex gap-[20px] mt-2'>
                            <h4 className='px-4 py-[3px] rounded bg-violet-600 text-zinc-100'>{userData.role === 0 ? ('User') : ('Admin')} Account</h4>
                            <h4 className='px-4 py-[3px] rounded bg-emerald-600 text-zinc-100'>{userData.accountStatus} Account</h4>
                        </div>
                        <div className='flex gap-[20px] mt-2 items-center'>
                            <div className='px-4 py-[7px] h-full rounded bg-rose-600 text-zinc-100 flex gap-[10px] items-center justify-center text-[14px]'><AiFillHeart className='text-[22px]' />{counts.likes}</div>
                            <div className='px-4 py-[7px] h-full rounded bg-amber-600 text-zinc-100 flex gap-[10px] items-center justify-center text-[14px]'><AiFillEye className='text-[22px]' />{counts.views}</div>
                            <button className='w-[200px] flex items-center justify-center gap-[10px] px-4 py-[3px] rounded bg-teal-600 text-zinc-100 text-[20px]' onClick={e => setIsEditOpen(true)}>Edit <FaPen className='text-[16px]' /></button>
                        </div>
                    </div>
                ) : (
                    <div className='w-full h-full rounded bg-[#111] p-2'>
                        <p className='text-zinc-300 text-[18px]'>To view and access your information please verify its you by entering your password below.</p>
                        <form>
                            <input ref={passwordRef} type="password" name="password" placeholder='Your Password...' className='w-[90%] h-[30px] bg-zinc-300 rounded indent-4 mt-[30px]' autoFocus tabIndex={1} />
                            <button disabled={isLoading} className='w-[120px] h-[40px] flex items-center justify-center rounded bg-violet-800 text-zinc-100 shadow-lg mt-[10px] hover:shadow-none hover:bg-violet-700' onClick={handleAccess}>{isLoading ? (<RiLoader3Fill className='animate-spin text-[26px]' />) : ('Get Access')}</button>
                        </form>
                    </div>
                )
            }
        </div>
        
        <UserAnalytics blogs={blogs} counts={counts} topBlogs={topBlogs} />
        {
            isEditOpen && (
                <div className='w-full h-full fixed top-0 left-0 bg-[#00000040] rounded flex items-center justify-center'>
                    <div className='w-[50px] h-[50px] rounded-br rounded-tl bg-amber-500 absolute top-0 left-0 flex items-center justify-center cursor-pointer' onClick={e=>setIsEditOpen(false)}>
                        <FaArrowLeft className='text-[22px]' />
                    </div>
                    <Register userData={userData} formType='edit' setIsEditOpen={setIsEditOpen} setUserData={setUserData} />
                </div>
            )
        }
    </div>
  )
}

export default UserDashboard
import React, { useState } from 'react'
import { RiLoader3Line, RiProfileFill } from 'react-icons/ri'
import { IoLogOut } from 'react-icons/io5'
import { FaBloggerB } from 'react-icons/fa'
import { logout } from '../Auth/helper/authApiCalls'
import { toast } from 'react-toastify'
import { deAuthenticateUser } from '../../utils/LS_Helper'
import { Navigate } from 'react-router-dom'

const Menu = ({setMenuOpen = f=>f}) => {
    const [loggedOut,setLoggedOut] = useState(false)
    const [isLoading,setIsloading] = useState(false)

    const handleLogout = () => {
        setIsloading(true)
        logout().then(data => {
            if(data.response?.data.error){
                setIsloading(false)
                return toast.error(data.response?.data.message[0])
            }else if(data.name === 'AxiosError'){
                setIsloading(false)
                return toast.error("Faild to logout!")
            }

            if(!deAuthenticateUser()){
                setIsloading(false)
                return toast.error("Faild to logout!")
            }
            
            toast.success("Logged out.Now Redirecting...")
            setLoggedOut(true)
            setIsloading(false)
            setMenuOpen(false)
        }).catch(err => console.log(err))
    }

  return (
    <div className={`w-[300px] min-h-[100px] h-max flex flex-col gap-[10px] p-2 px-4 rounded fixed top-[80px] right-[30px] bg-purple-900 bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-40 z-[100000]`}>
        {
            loggedOut && (<Navigate to='/' />)
        }
        <div className={`w-full h-[40px] rounded bg-violet-700 flex items-center px-4 gap-[10px] font-[600] text-zinc-100 cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-violet-700 hover:to-indigo-700`}>
            <RiProfileFill className='text-[26px]' />
            <span>My Profile</span>
        </div>
        <div className={`w-full h-[40px] rounded bg-violet-700 flex items-center px-4 gap-[10px] font-[600] text-zinc-100 cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-violet-700 hover:to-indigo-700`}>
            <FaBloggerB className='text-[24px]' />
            <span>My Blogs</span>
        </div>

        <div className={`w-full h-[40px] rounded bg-rose-700 flex items-center px-4 gap-[10px] font-[600] text-zinc-100 cursor-pointer shadow-lg hover:bg-gradient-to-r hover:from-rose-700 hover:to-pink-600`} onClick={e => !isLoading && handleLogout() }>
            {
                isLoading ? (
                    <RiLoader3Line className='text-[26px] animate-spin' />
                ) : (
                    <>
                        <IoLogOut className='text-[26px]' />
                        <span>Logout</span>
                    </>
                )
            }
        </div>
    </div>
  )
}

export default Menu
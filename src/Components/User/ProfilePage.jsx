import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { isAuthenticated } from '../../utils/LS_Helper'
import { getUserRole } from './helper/userApiCalls'
import UserDashboard from './UserDashboard'
import { toast } from 'react-toastify'

const ProfilePage = () => {
    const [userRole,setUserRole] = useState(undefined)
    const {user,token} = isAuthenticated()

    useEffect(() => {
        getUserRole(user._id,token).then(data=>{
            if(data.response?.data.error){
                setUserRole(0)
              return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                setUserRole(0)
              return toast.error('Faild to get information!')
            }

            setUserRole(data.data)
          })
    },[])
  return (
    <Base>
        {
            userRole !== undefined ? (
                userRole === 0 ? (
                    <UserDashboard />
                ) : ''
            ) : (<div className='w-full h-[80vh] flex items-center justify-center text-zinc-100'>Loading ....</div>)
        }
    </Base>
  )
}

export default ProfilePage
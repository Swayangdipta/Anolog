import React, { useContext, useEffect } from 'react'
import Base from './Base'
import { isAuthenticated } from '../../utils/LS_Helper'
import { Navigate } from 'react-router-dom'
import Featured from './Featured'
import HomeContents from './HomeContents'
import Filters from './Filters'
import { getUserLikes } from './helper/baseApiCalls'
import { UserContext } from '../../context/UserContext'

const Home = () => {
  const [userInfo,setUserInfo] = useContext(UserContext)
  const {user,token} = isAuthenticated()

  useEffect(() => {
    if(user){
      getUserLikes(user._id).then(data => {
        if(data.response?.data.error || data.name === 'AxiosError'){
          return console.log(data);
        }

        setUserInfo({...userInfo,likes: data.data})
      })
    }
  },[])
  return (
      <Base>
        <div className='w-[95%] md:w-[90%] min-h-screen h-max flex flex-col m-auto mt-[70px] md:mt-[90px] relative top-0'>
          <Featured />
          <HomeContents />
          <Filters />
        </div>
      </Base>
  )
}

export default Home
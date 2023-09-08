import React, { useState } from 'react'
import Base from '../Base/Base'
import Login from './Login'
import Register from './Register'


const Auth = () => {
    const [authType,setAuthType] = useState('login')
  return (
    <Base>
        <div className='w-screen h-screen flex items-center justify-center'>
            {
                authType === 'login' ? (<Login setAuthType={setAuthType} />) : (<Register setAuthType={setAuthType} />)
            }
        </div>
    </Base>
  )
}

export default Auth
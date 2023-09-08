import {createContext, useState} from 'react'

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [userInfo,setUserInfo] = useState({likes: {}})

    return (
        <UserContext.Provider value={[userInfo,setUserInfo]}>
            {props.children}
        </UserContext.Provider>
    )
}
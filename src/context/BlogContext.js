import {createContext,useState,useEffect} from 'react'
import { getBlogs } from '../Components/Base/helper/baseApiCalls'
import { toast } from 'react-toastify'

export const BlogContext = createContext()

export const BlogProvider = props => {
    const [blogs,setBlogs] = useState([])

    useEffect(()=>{
        getBlogs("10","1").then(data => {
            if(data.response?.data.error){
                return toast.error(data.response.data.message[0])
            }else if(data.name === 'AxiosError'){
                return toast.error('Something went wrong! Try again.')
            }

            setBlogs(data.data)
        }).catch(e=> console.log(e))
    },[])

    return (
        <BlogContext.Provider value={[blogs,setBlogs]}>
            {props.children}
        </BlogContext.Provider>
    )
}
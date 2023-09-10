import React, { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { searchBlog } from './helper/baseApiCalls'
import { toast } from 'react-toastify'
import SearchResultItem from './SearchResultItem'

const Search = ({setIsSearchOpen = f => f }) => {
    const [searchResults,setSearchResults] = useState([])
    const [noBlogs,setNoBlogs] = useState(false)

    const handleSearch = ev => {
        const query = ev.target.value
        if(query !== ''){
            searchBlog(query).then(data => {
                if(data.response?.data.error){
                    return toast.error(data.response.data.message[0])
                }else if(data.name === 'AxiosError'){
                    return toast.error('Something went wrong. Try Again!')
                }

                if(data.data.length === 0){
                    setNoBlogs(true)
                }

                setSearchResults(data.data)
            }).catch(err => {
                return toast.error(err.error ? err.message[0] : 'Faild to search!')
            })
        }else{
            setNoBlogs(false)
        }
    }
  return (
    <div className='w-screen h-[calc(100vh_-_70px)] flex items-center justify-center fixed top-[70px] left-0 bg-[#000000de]'>
            <div className='w-[95%] sm:w-[70%] h-[90%] rounded bg-gray-900 shadow-lg p-4 flex flex-col gap-[30px]'>
                <div className='w-full h-[45px] flex items-center justify-center relative top-0'>
                    <input type="text" onChange={handleSearch} className='w-full h-full rounded border-2 border-gray-600 bg-gray-800 indent-[55px] text-gray-400 font-raleway'  autoCapitalize="true" autoFocus placeholder='Search blogs...' />
                    <RiSearch2Line className='absolute left-[10px] text-[28px] text-gray-400' />
                </div>

                <div className='w-full h-[calc(100%_-_75px)] gap-[30px] overflow-x-hidden overflow-y-scroll categories'>
                    {
                        searchResults.length > 0 ? searchResults.map((blog,index) => (
                            <SearchResultItem blog={blog} key={index} />
                        )) : (
                            <h4 className='text-gray-600 text-center'>{noBlogs ? 'No Blogs Found' : 'Search something...'}</h4>
                        )
                    }
                </div>
            </div>
    </div>
  )
}

export default Search
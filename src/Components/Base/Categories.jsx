import React, { useContext, useEffect, useState } from 'react'
import { getCategories } from './helper/baseApiCalls'
import { toast } from 'react-toastify'
import { FiltersContext } from '../../context/FiltersContext'

const Categories = () => {
    const [categories,setCategories] = useState([])
    const [filters,setFilters] = useContext(FiltersContext)
    const [searchResult,setSearchResult] = useState([])

    const handleSearch = value => {
        let results = categories.filter(cate => cate.name.toLowerCase().includes(value.toLowerCase()))
        setSearchResult(results)
    }

    useEffect(()=>{
        getCategories().then(data => {
            if(data.response?.data.error){
                toast.error(data.response?.data.error)
                return
            }else if(data.name === 'AxiosError'){
                toast.error('Can not get categories!')
                return
            }

            setCategories(data.data)
        })
    },[])
  return (
    <div className='w-[200px] h-[300px] overflow-y-scroll overflow-x-hidden rounded-md bg-black absolute top-0 right-[50px] categories cursor-auto'>
        <h4 className='text-zinc-300 underline w-[100%] bg-black absolute top-0 p-2 px-4 text-[18px]'>Categories</h4>
        <input onChange={e => handleSearch(e.target.value)} className='w-[90%] mr-4 ml-4 p-1 mt-[40px]' type="text" placeholder='Find Category...' />
        <div className='w-full p-2 px-4 mt-[5px]'>
            {
                searchResult.length > 0 ? (searchResult.map((category,index) => (
                    <div key={index} className='w-full px-2 py-[5px] bg-emerald-200 mb-[10px] rounded-md cursor-pointer text-zinc-900 font-[600]' onClick={e => setFilters({...filters,category: category.name})}>{category.name}</div>
                ))) : 
                categories.length > 0 ? categories.map((category,index) => (
                    <div key={index} className='w-full px-2 py-[5px] bg-emerald-200 mb-[10px] rounded-md cursor-pointer text-zinc-900 font-[600]' onClick={e => setFilters({...filters,category: category.name})}>{category.name}</div>
                )) : ('')
            }
        </div>
    </div>
  )
}

export default Categories
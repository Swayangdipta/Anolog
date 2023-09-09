import React, { useContext, useEffect, useState } from 'react'
import {BiSolidCategory} from 'react-icons/bi'
import {BsFillSunFill,BsFillMoonStarsFill} from 'react-icons/bs'
import {MdViewComfy,MdViewModule} from 'react-icons/md'
import {FaSortAmountUp,FaSortAmountDown,FaSortAlphaDown,FaSortAlphaUp} from 'react-icons/fa'
import { FiltersContext } from '../../context/FiltersContext'
import Categories from './Categories'
const Filters = () => {
  const [filters,setFilters] = useContext(FiltersContext)
  const [isCategoriesOpen,setIsCategoriesOpen] = useState(false)

  const handleFilterChange = field => value => {
    setFilters({...filters,[field]: value})
  }
  return (
    <div className='w-[60px] h-max pb-[10px] rounded bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border-[1px] border-zinc-700 fixed top-[90px] right-[4%] hidden md:block'>
        <h4 className='w-full py-[5px] bg-black rounded-t text-zinc-500 text-center'>Filters</h4>
        
        <div className="w-[40px] h-[40px] rounded bg-black relative top-0 m-[auto] mt-[10px] flex items-center justify-center cursor-pointer group">
            <div className='absolute left-[-100px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>Category</div>
            {isCategoriesOpen && (<Categories />)}
            <BiSolidCategory className='text-zinc-400 text-[30px] '  onClick={e => setIsCategoriesOpen(!isCategoriesOpen)} />
        </div>

        <div className="w-[40px] h-[40px] rounded bg-black relative top-0 m-[auto] mt-[10px] flex items-center justify-center cursor-pointer group" onClick={() => handleFilterChange('sort')('new')}>
            <div className='absolute left-[-85px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>Newest</div>
            <FaSortAlphaUp className='text-zinc-400 text-[26px] ' />
        </div>

        <div className="w-[40px] h-[40px] rounded bg-black relative top-0 m-[auto] mt-[10px] flex items-center justify-center cursor-pointer group" onClick={() => handleFilterChange('sort')('old')}>
            <div className='absolute left-[-77px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>Oldest</div>
            <FaSortAlphaDown className='text-zinc-400 text-[26px] ' />
        </div>

        <div className="w-[40px] h-[40px] rounded bg-black relative top-0 m-[auto] mt-[10px] flex items-center justify-center cursor-pointer group" onClick={() => handleFilterChange('sort')('highest')}>
            <div className='absolute left-[-122px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>Sort By Likes</div>
            <FaSortAmountUp className='text-zinc-400 text-[24px] ' />
        </div>

        <div className="w-[40px] h-[40px] rounded bg-black relative top-0 m-[auto] mt-[10px] flex items-center justify-center cursor-pointer group" onClick={() => handleFilterChange('sort')('lowest')}>
            <div className='absolute left-[-122px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>Sort By Likes</div>
            <FaSortAmountDown className='text-zinc-400 text-[24px] ' />
        </div>

        {
          filters.view === 'compact' ? (
            <div className="w-[40px] h-[40px] rounded bg-black relative top-0 m-[auto] mt-[10px] flex items-center justify-center cursor-pointer group" onClick={() => handleFilterChange('view')('normal')}>
              <div className='absolute left-[-63px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>View</div>
              <MdViewModule className='text-zinc-400 text-[24px] ' />
            </div>
          ) : (
            <div className="w-[40px] h-[40px] rounded bg-black relative top-0 m-[auto] mt-[10px] flex items-center justify-center cursor-pointer group" onClick={() => handleFilterChange('view')('compact')}>
              <div className='absolute left-[-63px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>View</div>
              <MdViewComfy className='text-zinc-400 text-[24px] ' />
            </div>
          )
        }

        <div className="w-[40px] h-[40px] rounded bg-black relative top-0 m-[auto] mt-[10px] flex items-center justify-center cursor-pointer group" onClick={() => handleFilterChange('theme')(filters.theme === 'dark' ? ('light') : ('dark'))}>
            {
              filters.theme === 'dark' ? (
                <>
                  <div className='absolute left-[-112px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>Light Mode</div>
                  <BsFillSunFill className='text-amber-400 text-[22px] animate-spin-slow' />                
                </>
              ) : (
                <>
                  <div className='absolute left-[-111px] px-[10px] py-[5px] text-zinc-300 rounded bg-zinc-900 select-none hidden group-hover:block'>Dark Mode</div>
                  <BsFillMoonStarsFill className='text-teal-400 text-[22px] animate-wiggle' />
                </>
              )
            }
        </div>
    </div>
  )
}

export default Filters
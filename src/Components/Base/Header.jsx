import React, { useContext, useEffect, useState } from 'react'
import {RiMenu2Line, RiSearchFill} from 'react-icons/ri'
import {IoCreate} from 'react-icons/io5'
import Search from './Search'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../utils/LS_Helper'
import Menu from './Menu'
import { FiltersContext } from '../../context/FiltersContext'

const Header = () => {
  const [isSearchOpen,setIsSearchOpen] = useState(false)
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const [currentPage,setCurrentPage] = useState('/')
  const [filters,setFilters] = useContext(FiltersContext)

  const {user,token} = isAuthenticated()

  useEffect(() => {
    setCurrentPage(window.location.pathname)
  },[window.location.pathname])
  return (
    <div className='w-screen h-[70px] z-[100000] px-[5vw] flex items-center justify-between fixed top-0 left-0 bg-[#111] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-20 border-b-[1px] border-zinc-700'>

    <img src="https://img.logoipsum.com/285.svg" alt="Website Logo" />

    {
      currentPage !== '/auth' && (
        <div className='flex justify-center items-center gap-[30px] w-max'>
            <div className='w-[40px] cursor-pointer h-[40px] text-[24px] text-zinc-900 hover:text-emerald-600 bg-zinc-300 rounded-md flex items-center justify-center border-0' onClick={e => setIsSearchOpen(!isSearchOpen)}>
                <RiSearchFill />
            </div>
            {
              !user || !token ? (
              <Link to="/auth">
                <button className={`w-[100px] h-[40px] rounded-md font-[600] text-white cursor-pointer transition ease-in-out delay-100 ${filters.theme === 'dark' ? ' bg-emerald-500 hover:bg-emerald-700' : ' bg-emerald-800 hover:bg-emerald-900'}`}>Log in</button>
              </Link>                
              ) : (
              <>
                <Link to="/publish">
                  <button className={`w-max h-[40px] px-4 rounded-md font-[600] text-white cursor-pointer transition ease-in-out delay-100 flex items-center gap-[10px] ${filters.theme === 'dark' ? 'bg-purple-700 hover:bg-violet-700' : 'bg-indigo-800 hover:bg-sky-900'}`}>
                    <IoCreate className='text-[24px] mt-[-2px]' />
                    <span>Publish</span>
                  </button>
                </Link> 
                <div className={`w-[40px] cursor-pointer h-[40px] text-[24px] text-zinc-200 hover:text-amber-200 rounded-md flex items-center justify-center border-0 ${filters.theme === 'dark' ? 'bg-violet-600' : 'bg-violet-900'}`} onClick={e => setIsMenuOpen(!isMenuOpen)}>
                  <RiMenu2Line />
                </div>
              </>
              )
            }
        </div>        
      )
    }

    {
      isSearchOpen && <Search setIsSearchOpen={setIsSearchOpen} />
    }

    {
      isMenuOpen && <Menu setMenuOpen={setIsMenuOpen} />
    }

    </div>
  )
}

export default Header
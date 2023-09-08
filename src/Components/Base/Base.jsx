import React, { useContext, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { FiltersContext } from '../../context/FiltersContext'

const Base = (props) => {
  const [filters,setFilters] = useContext(FiltersContext)

  useEffect(() => {
    if(filters.theme === 'dark'){
      document.body.style.background = 'linear-gradient(99deg,#00001d,#1d001d)'
    }else{
      document.body.style.background = 'linear-gradient(0deg,#2AF598,#08AEEA)'
    }

  },[filters.theme])
  return (
    <div className='w-screen min-h-screen h-max '>
        <Header />
          {props.children}
        <Footer />
    </div>
  )
}

export default Base
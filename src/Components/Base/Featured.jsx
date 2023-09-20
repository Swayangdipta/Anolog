import React, { useState, useEffect } from 'react'
import FeaturedCard from './FeaturedCard'
const Featured = () => {

  return (
    <div className={`w-full md:w-[300px] h-max p-4 md:p-0 md:h-[450px] rounded md:fixed md:top-[90px]`}>
        <img src="https://img.freepik.com/free-photo/blue-balls-black_1340-27523.jpg?t=st=1691591482~exp=1691595082~hmac=510acbc9b639c42dfa88bae02cca598cc239a6e2896d1e0ae6b2fee6509ab630&w=360" className='w-full h-full rounded absolute top-0 object-contain hidden md:block' />
        <div className='w-full h-full rounded bg-[#111] flex flex-row gap-[20px] md:block bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border-[1px] border-zinc-700 p-[10px]'>
            <div className='w-full h-[50%]'>
                <h1 className='text-[18px] md:text-[24px] text-zinc-400 underline'>Most Liked</h1>
                <FeaturedCard />
            </div>
            <div className='w-full h-[50%]'>
                <h1 className='text-[18px] md:text-[24px] text-zinc-400 underline'>Most Viewed</h1>
                <FeaturedCard />
            </div>
        </div>
    </div>
  )
}

export default Featured
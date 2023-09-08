import React from 'react'
import {AiFillEye, AiFillHeart, AiFillMessage} from 'react-icons/ai'
import { Link } from 'react-router-dom'

const FeaturedCard = () => {
  return (
    <Link>
    <div className='w-full h-[80%] rounded relative top-0 group'>
        <img src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2150394443.jpg?w=740&t=st=1691592319~exp=1691592919~hmac=8c649ce452fa463988664a9f7a1d7f8ad466f9d5f8c38b13fba219069eaaa5ba" alt="most liked" className='w-full h-full object-cover rounded' />
        <div className='w-full h-0 p-2 duration-500 group-hover:h-full bg-[#000000de] absolute bottom-0 left-0 rounded overflow-hidden text-zinc-300 leadinvioletp6]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam atque voluptates hic repellendus fugit exercitationem dignissimos sapiente maxime, dolore maiores ducimus rerum nihil explicabo, vel doloremque a. Distinctio, quidem nobis.

        </div>
        <div className='absolute bottom-0 left-0 w-full h-[30px] bg-black rounded-b flex items-center justify-between px-[10px]'>
            <span className='text-violet-600 text-[22px] flex items-center gap-[5px]'>
                <AiFillHeart />
                <p className='text-[12px]'>22.5k</p>
            </span>

            <span className='text-violet-600 text-[22px] flex items-center gap-[5px]'>
                <AiFillMessage />
                <p className='text-[12px]'>10k</p>
            </span>

            <span className='text-violet-600 text-[22px] flex items-center gap-[5px]'>
                <AiFillEye />
                <p className='text-[12px]'>30k</p>
            </span>
        </div>
    </div>
    </Link>
  )
}

export default FeaturedCard
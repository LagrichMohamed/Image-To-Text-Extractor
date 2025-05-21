import Link from 'next/link'
import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
const Header = () => {
  return (
    <div className='text-white w-full flex justify-between items-center md:px-20 py-5 px-5 sticky top-0 left-0 backdrop-blur-xl'>
        <div>
            <Link href={"/"} className='font-[800] text-3xl'>
                Get Text
            </Link>
        </div>
        <div>
            {/* change this link to the github repo later */}
            <a href="/" target='_blank' referrerPolicy="no-referrer" className='flex items-center justify-center bg-white text-black text-base font-[600] px-5 py-2 rounded-md'>
                <span>Github</span>
                <span><GoArrowUpRight/></span>


            </a>
        </div>
    </div>
  )
}

export default Header

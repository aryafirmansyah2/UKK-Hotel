import React, { useRef, useState } from 'react'
import Image from 'next/image'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//import icons
import { FaHotel } from 'react-icons/fa'
import { IoIosArrowForward, } from 'react-icons/io'
import { BiSearch } from 'react-icons/bi'

//import image
import Main from '../../../../assets/image/Hero/main.png'
import Overlay from '../../../../assets/image/Hero/overlay.png'

//import Components
import Button from '../../../Common/Button'

const Pencarian = () => {
  return (
    <div>
      <div className='relative'>
        <div className='absolute w-full z-[-1] '>
          <Image src={Main} className='w-full' />
          <Image src={Overlay} className='absolute top-0 w-full ' />
          <div className='absolute top-0 flex flex-col items-start justify-center w-full h-full px-5 bg-black opacity-50 md:px-[100px] '>
            <h2 className='text-lg font-bold text-white md:text-4xl xl:text-6xl'>Temukan Penginapan</h2>
            <h2 className='text-lg font-bold text-white md:text-4xl xl:text-6xl'>Sesuai Dengan Kriteriamu !</h2>
          </div>
        </div>
      </div>

      <div className=' w-full pt-[100px] px-5 md:px-[100px] md:pt-40 lg:pt-56 xl:pt-96 mb-44'>
        <div className='bg-white dark:bg-gray-800 w-50% rounded-lg px-[30px]'>
        </div>
      </div>
    </div>
  )
}

export default Pencarian
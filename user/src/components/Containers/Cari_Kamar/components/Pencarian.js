import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'
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
import moment from 'moment';
import axios from 'axios';
import Pagination from '../../../Common/Pagination/Pagination';
import Link from 'next/link';
import { headerConfig } from '../../../utils/headerConfig';

// typeof window !== 'undefined' ? sessionStorage.getItem('checkin') : null

const Pencarian = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  useEffect(() => {
    handleFilterRoom()
    
  }, [])

  const handleFilterRoom = (e) => {
    if (e && e.preventDefault) {

      e.preventDefault()

      let data = {
        check_in_date: startDate,
        check_out_date: endDate
      }

      axios.post("http://localhost:8080/filter-room", data, headerConfig())
        .then((result) => {
          if (startDate && endDate) {
            setData(result.data.room)
            sessionStorage.setItem("check_in", moment(startDate).format('YYYY-MM-DD'))
            sessionStorage.setItem("check_out", moment(endDate).format('YYYY-MM-DD'))
          }
          else {
            Swal.fire({
              title: 'Empty Value',
              text: 'Please fill in date data',
              icon: 'question',
              confirmButtonText: 'Ok'
            })

          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);


  // Change page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  const numberFormat = value =>
    new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value);


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

      <div className=' w-full pt-[100px] px-5 md:px-[100px] md:pt-40 lg:pt-56 xl:pt-96'>
        <div className='bg-white dark:bg-gray-800 w-50% rounded-lg px-[30px]'>

          <div className='py-5 md:flex md:justify-between'>
            <div className='flex items-center'>
              <FaHotel className='text-[#3305BB] text-2xl mr-4 ' />
              <h2 className='text-xl font-semibold lg:text-2xl '>Temukan Kamar Disini</h2>
            </div>
            <a href='#' className='flex flex-wrap items-center '>
              <h2 className='mr-4 text-lg text-gray-400'>Cari Lebih Lengkap</h2>
              <IoIosArrowForward className='text-lg text-gray-400' />
            </a>
          </div>
          <form onSubmit={handleFilterRoom}>

            <div className='w-full flex justify-between gap-5 py-[25px]'>
              <div className='w-full '>
                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-white'>Tgl Check In</h2>
                <DatePicker className='w-full p-5 rounded-lg dark:text-black' selected={startDate} onChange={(date) => setStartDate(date)} required />
              </div>
              <div className='w-full '>
                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-white'>Tgl Check Out</h2>
                <DatePicker className='w-full p-5 rounded-lg dark:text-black' selected={endDate} onChange={(date) => setEndDate(date)} required />
              </div>
            </div>

            <div className='flex items-center justify-between py-[28px] border-t-2 border-gray-200 '>
              <div className='flex items-center gap-2 '>
                <div className='flex items-center justify-center w-5 h-5 rounded-full ring-2 ring-orange-500'><div className='w-3 h-3 bg-orange-500 rounded-full' /></div>
                <p className='w-[80%] lg:w-full'>Hubungi Layanan Pelanggan Untuk Keperluan Bantuan</p>
              </div>
              <div>
                <Button className={'bg-blue-700 text-white px-3 flex items-center gap-4 '}><BiSearch /><span>Cari</span></Button>
              </div>
            </div>

          </form>

        </div>
        <div className="w-full mt-10">
          <div className="flex flex-wrap gap-7 " >
            {currentPosts ? currentPosts.map((kamars, i) => (
              <Link href={'/cari-kamar/detail/' + kamars.id_tipe_kamar} key={i}>
                <div className="max-w-sm mx-auto my-5 mr-5 overflow-hidden rounded-lg " >
                  <img src={`http://localhost:8080/image/tipe_kamar/${kamars.foto}`} alt="Flowbite Logo" className='w-[380px] h-[241px] m-auto rounded-lg' />
                  <div className=" py-4">
                    <div className="mb-2 text-lg font-semibold">{kamars.nama_tipe_kamar}</div>
                    <p className="text-base text-gray-700 dark:text-gray-400 font-medium">
                      {numberFormat(kamars.harga)}
                      <span className='text-gray-400'> per malam</span>
                    </p>
                    <p className="text-base text-gray-700 dark:text-gray-400 mt-3 ">
                      {
                        `${kamars.deskripsi.substring(0, 80)}...`
                      }
                    </p>
                  </div>
                </div >
              </Link >

            )) : <div>no data </div>}
          </div >
          {
            data.length == 0 ?
              <div className=''></div>
              :
              <Pagination postsPerPage={postsPerPage} totalPosts={data.length} paginate={paginate} />
          }
        </div >
      </div >
    </div >
  )
}

export default Pencarian
import React, { useState } from 'react'
import DatePicker from "react-datepicker";


const InputData = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className='w-full  my-10 lg:py-6 lg:pl-10'>
            <div className='border-gray-300 bg-white dark:border-white border-solid border-2 rounded-lg dark:bg-gray-800  px-5 mx-5 lg:mx-0'>
                <div className='mt-3 '>

                    <h1 className='text-xl font-medium border-b-2 border-solid border-gray-300 dark:border-white pb-3'>Rincian Harga</h1>

                    <div className='w-full lg:flex justify-between gap-5 py-[25px] '>
                        <div className='w-full '>
                            <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Nama Pemesanan</h2>
                            <input className='border-[1px] border-solid border-gray-500 dark:border-white w-full p-5 rounded-lg dark:text-black' type='text'/>
                        </div>
                        <div className='w-full '>
                            <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Nama Tamu</h2>
                            <input className='border-[1px] border-solid border-gray-500 dark:border-white w-full p-5 rounded-lg dark:text-black' type='text'/>
                        </div>
                        <div className='w-full '>
                            <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Email Pemesan</h2>
                            <input className='border-[1px] border-solid border-gray-500 dark:border-white w-full p-5 rounded-lg dark:text-black' type='email' />
                        </div>
                    </div >

                    <div className='w-full flex justify-between gap-5 py-[25px] '>
                        <div className='w-full '>
                            <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Tgl Check In</h2>
                            <DatePicker className='w-full p-5 rounded-lg dark:text-black' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className='w-full '>
                            <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Tgl Check Out</h2>
                            <DatePicker className='w-full p-5 rounded-lg dark:text-black' selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                    </div >

                    <h1 className='mt-4 text-xl font-medium '>Rincian Harga Kamar</h1>
                    <div className='bg-gray-100 mt-5 px-5 py-3 rounded-lg dark:bg-gray-900'>
                        <div className='flex justify-between text-lg font-medium'>
                            <h3 className='text-gray-500'>Tipe Kamar</h3>
                            <h3>aasd</h3>
                        </div>
                        <div className='flex justify-between text-lg font-medium mt-3'>
                            <h3 className='text-gray-500'>Lama Penginapan</h3>
                            <h3>3</h3>
                        </div>
                        <div className='flex justify-between text-lg font-medium mt-3'>
                            <h3 className='text-gray-500'>Total Harga</h3>
                            <h3>2423432</h3>
                        </div>
                    </div>
                    <button className='mb-5 bg-primary-700 text-white w-full mt-5 py-3 rounded-lg text-xl font-medium'>Bayar</button>
                </div>
            </div>
        </div>
    )
}

export default InputData
import Image from 'next/image'
import React from 'react'
import gopay from '../../../assets/Logo/gopay-seeklogo.com-5.svg'

const MetodePembayaran = () => {
    return (
        <div className='w-full px-[100px] py-10'>
            <h1 className='text-3xl font-bold '>Metode Pembayaran</h1>
            <div className='w-full mt-10 bg-white p-5 rounded-lg' >
                <h1 className=' text-2xl font-medium pb-5 border-b-2 border-solid border-gray-300'>Kartu Kredit / debit</h1>
                <a href='/pembayaran/bayar' className='flex items-center justify-between'>
                    <h2 className='font-medium text-gray-500 text-lg '>Kartu Kredit / Debit</h2>
                    <Image className=' object-contain  h-16' src={gopay} />
                </a>
            </div>
            <div className='w-full mt-10 bg-white p-5 rounded-lg'>
                <h1 className=' text-2xl font-medium pb-5 border-b-2 border-solid border-gray-300'>Cicilan Tanpa Kartu Kredit </h1>
                <a href='/pembayaran/bayar' className='flex items-center justify-between'>
                    <h2 className='font-medium text-gray-500 text-lg '>Kredivo</h2>
                    <Image className=' object-contain  h-16' src={gopay} />
                </a>
                <a href='/pembayaran/bayar' className='flex items-center justify-between'>
                    <h2 className='font-medium text-gray-500 text-lg '>AkuLaku</h2>
                    <Image className=' object-contain  h-16' src={gopay} />
                </a>
            </div>
            <div className='w-full mt-10 bg-white p-5 rounded-lg'>
                <h1 className=' text-2xl font-medium pb-5 border-b-2 border-solid border-gray-300'>Virtual Account</h1>
                <a href='/pembayaran/bayar' className='flex items-center justify-between'>
                    <h2 className='font-medium text-gray-500 text-lg '>BCA Virtual Account</h2>
                    <Image className=' object-contain  h-16' src={gopay} />
                </a>
                <a href='/pembayaran/bayar' className='flex items-center justify-between'>
                    <h2 className='font-medium text-gray-500 text-lg '>Mandiri Virtual Account</h2>
                    <Image className=' object-contain  h-16' src={gopay} />
                </a>
                <a href='/pembayaran/bayar' className='flex items-center justify-between'>
                    <h2 className='font-medium text-gray-500 text-lg '>BNI Virtual Account</h2>
                    <Image className=' object-contain  h-16' src={gopay} />
                </a>
                <a href='/pembayaran/bayar' className='flex items-center justify-between'>
                    <h2 className='font-medium text-gray-500 text-lg '>BRIVA</h2>
                    <Image className=' object-contain  h-16' src={gopay} />
                </a>
            </div>
        </div>
    )
}

export default MetodePembayaran
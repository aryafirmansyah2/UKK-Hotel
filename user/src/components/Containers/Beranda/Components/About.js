import React from 'react'

//import icon
import { GiAchievement } from 'react-icons/gi'

const About = () => {
    return (
        <>
            <div className='px-5 my-20 md:px-[100px]' >
                <div className=''>
                    <h1 className='text-2xl font-semibold '>Alasan Dibalik Memilih Kami</h1>
                    <div className='items-center justify-between mt-5 lg:flex'>
                        <div className='max-w-[500px] pt-8 mr-5 '>
                            <div className='flex items-center justify-center w-16 h-16 bg-red-200 rounded-full'>
                                <GiAchievement className='text-4xl text-red-800' />
                            </div>
                            <h1 className='mt-5 text-2xl font-bold'>Pelayanan Terbaik</h1>
                            <p className='mt-3 text-lg text-gray-700 dark:text-gray-400'>
                                Lorem Ipsum hanyalah teks tiruan dari industri percetakan dan penyusunan huruf.
                            </p>
                        </div>
                        <div className='max-w-[500px] pt-8 mr-5 '>
                            <div className='flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full'>
                                <GiAchievement className='text-4xl text-blue-800' />
                            </div>
                            <h1 className='mt-5 text-2xl font-bold'>Pelayanan Terbaik</h1>
                            <p className='mt-3 text-lg text-gray-700 dark:text-gray-400'>
                                Lorem Ipsum hanyalah teks tiruan dari industri percetakan dan penyusunan huruf.
                            </p>
                        </div>
                        <div className='max-w-[500px] pt-8 mr-5 '>
                            <div className='flex items-center justify-center w-16 h-16 bg-green-200 rounded-full'>
                                <GiAchievement className='text-4xl text-green-800' />
                            </div>
                            <h1 className='mt-5 text-2xl font-bold'>Pelayanan Terbaik</h1>
                            <p className='mt-3 text-lg text-gray-700 dark:text-gray-400'>
                                Lorem Ipsum hanyalah teks tiruan dari industri percetakan dan penyusunan huruf.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
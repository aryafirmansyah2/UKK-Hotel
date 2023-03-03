import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Listkamar = ({ }) => {

    const [kamars, setKamars] = useState()

    useEffect(() => {
        fetchKamar()
    }, [])

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    }


    const fetchKamar = () => {
        axios.get("http://localhost:8080/tipe_kamar/")
            .then(function (res) {
                setKamars(res.data.data)
            });
    }

    function splitPath(path) {
        const respath = path.split('\\')
        return respath[0] + "/" + respath[1] + "/" + respath[2]
    }
    return (
        <>
            <div className='px-5 mt-20 md:px-[100px]'>
                <div className=''>
                    <h1 className='text-3xl font-semibold'>Rekomendasi Kamar Terbaik Hari Ini!</h1>
                    <p className='mt-3 text-xl font-medium text-gray-500'>6 Rekomendasi Tersedia</p>
                    <div className="w-full ">
                        <Carousel
                            responsive={responsive}
                            removeArrowOnDeviceType={["tablet", "mobile",]}
                        >
                            {kamars ? kamars.map((kamars,i) => (
                                <div className="max-w-sm mx-auto my-5 mr-5 overflow-hidden bg-white rounded shadow-lg dark:bg-gray-700" key={i}>
                                        <img src={`http://localhost:8080/${splitPath(kamars.foto)}`} alt="Flowbite Logo"  />
                                    <div className="px-6 py-4">
                                        <div className="mb-2 text-xl font-bold">{kamars.nama_tipe_kamar}</div>
                                        <p className="text-base text-gray-700 dark:text-gray-400">
                                            {
                                                `${kamars.deskripsi.substring(0, 80)}...`
                                            }
                                        </p>
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#photography</span>
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#travel</span>
                                        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#winter</span>
                                    </div>
                                </div>
                            )) : <div>no data insert</div>}
                        </Carousel>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Listkamar
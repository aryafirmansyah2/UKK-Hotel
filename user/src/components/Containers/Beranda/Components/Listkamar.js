import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { headerConfig } from '../../../utils/headerConfig';

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
            items: 2.1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1.2
        }
    }


    const fetchKamar = () => {
        axios.get("http://localhost:8080/tipe_kamar/", headerConfig())
            .then(function (res) {
                setKamars(res.data.data)
            });
    }

    const numberFormat = value =>
        new Intl.NumberFormat("en-ID", {
            style: "currency",
            currency: "IDR"
        }).format(value);

    return (
        <>
            <div className='px-5 mt-20 md:px-[100px]'>
                <div className=''>
                    <h1 className='text-3xl font-semibold'>Rekomendasi Kamar Terbaik Hari Ini!</h1>
                    <p className='mt-3 text-xl font-medium text-gray-500'>6 Rekomendasi Tersedia</p>
                    <div className="w-full mt-10 ">
                        <Carousel
                            responsive={responsive}
                            removeArrowOnDeviceType={["tablet", "mobile",]}
                        >
                            {kamars ? kamars.map((kamars, i) => (
                                <div className="max-w-sm mx-auto my-5 mr-5 overflow-hidden rounded-lg " key={i}>
                                    <img src={`http://localhost:8080/image/tipe_kamar/${kamars.foto}`} alt="Flowbite Logo" className='rounded-lg' />
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
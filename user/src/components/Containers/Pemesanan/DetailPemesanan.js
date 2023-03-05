import axios from 'axios';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import { headerConfig } from '../../utils/headerConfig';

const DetailPemesanan = () => {
    const [data, setData] = useState()
    const [formatTglPemesanan, setFormatTglPemesanan] = useState()

    const [nomorPemesanan, setNomorPemesanan] = useState()
    const [namaPemesan, setNamaPemesan] = useState()
    const [emailPemesan, setEmailPemesan] = useState()
    const [tglPemesanan, setTglPemesanan] = useState()
    const [tglCheckIn, setTglCheckIn] = useState()
    const [tglCheckOut, setTglCheckOut] = useState()
    const [jumlahKamar, setJumlahKamar] = useState()
    const [namaTipeKamar, setNamaTipeKamar] = useState()
    const [days, setDays] = useState()
    const [harga, setHarga] = useState()
    const [foto, setFoto] = useState()

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        getPemesananById()
        getKamarBoked()
    }, [id])

    const getPemesananById = async (e) => {
        await axios.get(`http://localhost:8080/pemesanan/${id}`, headerConfig())
            .then((res) => {
                setNomorPemesanan(res.data.data?.nomor_pemesanan)
                setNamaPemesan(res.data.data?.customer.name)
                setEmailPemesan(res.data.data?.customer.email)
                setTglPemesanan(res.data.data?.tgl_pemesanan)
                setTglCheckIn(res.data.data?.tgl_check_in)
                setTglCheckOut(res.data.data?.tgl_check_out)
                setJumlahKamar(res.data.data?.jumlah_kamar)
                setNamaTipeKamar(res.data.data?.tipe_kamar.nama_tipe_kamar)
                setHarga(res.data.data?.tipe_kamar.harga)
                setFoto(res.data.data?.tipe_kamar.foto)

                const tglPertama = Date.parse(res.data.data?.tgl_check_in)
                const tglKedua = Date.parse(res.data.data?.tgl_check_out)
                const miliday = 24 * 60 * 60 * 1000;
                const selisih = (tglKedua - tglPertama) / miliday;
                setDays(selisih)
            })
    }

    const getKamarBoked = async (e) => {
        await axios.get(`http://localhost:8080/detail_pemesanan/${id}`, headerConfig())
            .then((res) => {
                setData(res.data.data)
            })
    }


    return (
        <div className='w-full px-[100px] py-10'>
            <div className='w-full'>
                <div className='border-gray-300 bg-white dark:border-white border-solid border-2 rounded-lg dark:bg-gray-800  px-5 mx-5 lg:mx-0'>
                    <div className='mt-3 '>

                        <h1 className='text-xl font-medium border-b-2 border-solid border-gray-300 dark:border-white pb-3'>Rincian Harga</h1>

                        <div className='w-full lg:flex justify-between gap-5 py-[25px] '>
                            <div className='w-full '>
                                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Nomor Pemesanan</h2>
                                <input disabled className='border-[1px] border-solid border-gray-500 dark:border-white w-full p-5 rounded-lg dark:text-black' type='text' value={nomorPemesanan || ''} />
                            </div>
                        </div >
                        <div className='w-full flex justify-between gap-5 py-[25px] '>
                            <div className='w-full '>
                                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Nama Tipe Kamar</h2>
                                <input disabled className='border-[1px] border-solid border-gray-500 dark:border-white w-full p-5 rounded-lg dark:text-black' type='text' value={namaTipeKamar || ''} />
                            </div>
                        </div >
                        <div className='w-full flex justify-between gap-5 py-[25px] '>
                            <div className='w-full '>
                                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Nama Pemesanan</h2>
                                <input disabled className='border-[1px] border-solid border-gray-500 dark:border-white w-full p-5 rounded-lg dark:text-black' type='text' value={namaPemesan || ''} />
                            </div>
                            <div className='w-full '>
                                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Email Pemesan</h2>
                                <input disabled className='border-[1px] border-solid border-gray-500 dark:border-white w-full p-5 rounded-lg dark:text-black' type='email' value={emailPemesan || ''} />
                            </div>
                        </div >

                        <div className='w-full flex justify-between gap-5 py-[25px] '>
                            <div className='w-full '>
                                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Tgl Pemesanan</h2>
                                <input type='date' disabled className='w-full p-5  rounded-lg ' value={tglPemesanan || ''} />
                            </div>
                            <div className='w-full '>
                                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Tgl Check In</h2>
                                <input type='date' disabled className='w-full p-5  rounded-lg ' value={tglCheckIn || ''} />
                            </div>
                            <div className='w-full '>
                                <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Tgl Check Out</h2>
                                <input type='date' disabled className='w-full p-5 rounded-lg ' value={tglCheckOut || ''} />
                            </div>
                        </div >

                        <div className='w-full flex justify-between items-center '>
                            <h1 className='mt-4 text-xl font-medium '>Cetak Invoice</h1>
                            <a href={`/pemesanan/detail-pemesanan/invoice/${id}`} className='border-2 border-solid border-primary-700 text-primary-700 font-medium px-3 py-2 rounded-lg'>Cetak</a>
                        </div >
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        No Kamar
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Nomor Tipe Kamar
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tgl Check In
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Tgl Check Out
                                    </th>
                                    {/* <th scope="col" className=" py-3  flex items-center justify-center">
                                        <div className='border-2 border-solid border-primary-700 text-primary-700 px-3 py-2 rounded-lg'>
                                        </div>
                                    </th> */}

                                </tr>
                            </thead>
                            <tbody>
                                {data ? data.map((item, i) => (
                                    <tr key={i} className="bg-gray-50  dark:bg-gray-800  dark:hover:bg-gray-600">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {item.kamar.nomor_kamar}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.kamar.tipe_kamar.nama_tipe_kamar}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.pemesanan.tgl_check_in}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.pemesanan.tgl_check_out}
                                        </td>
                                        {/* <td className="flex gap-5 px-6 py-4 "> */}
                                        {/* <div className='border-2 border-solid border-primary-700 text-primary-700 px-3 py-2 rounded-lg'>
                                                <a href={`/pemesanan/detail-pemesanan/invoice/${item.id_detail_pemesanan}`}>Cetak</a>
                                            </div> */}
                                        {/* </td> */}
                                    </tr>
                                )) :
                                    <tr>
                                        <td>no data</td>
                                    </tr>}
                            </tbody>
                        </table>

                        {/* <h1 className='mt-4 text-xl font-medium '>Rincian Harga Kamar</h1>
                        <div className='bg-gray-100 mt-5 px-5 py-3 rounded-lg dark:bg-gray-900'>
                            <div className='flex justify-between text-lg font-medium'>
                                <h3 className='text-gray-500'>Tipe Kamar</h3>
                                <h3>{namaTipeKamar}</h3>
                            </div>
                            <div className='flex justify-between text-lg font-medium mt-3'>
                                <h3 className='text-gray-500'>Lama Penginapan</h3>
                                <h3>{days} Days</h3>
                            </div>
                            <div className='flex justify-between text-lg font-medium mt-3'>
                                <h3 className='text-gray-500'>Total Harga</h3>
                                <h3>2423432</h3>
                            </div>
                        </div> */}
                        <button className='mb-5 bg-primary-700 text-white w-full mt-10 py-3 rounded-lg text-xl font-medium '>Bayar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPemesanan
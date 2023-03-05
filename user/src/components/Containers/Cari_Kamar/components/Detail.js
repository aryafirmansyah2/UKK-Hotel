import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios'
// import DatePicker from "react-datepicker";
import moment from 'moment/moment';
import Swal from 'sweetalert2';
import { headerConfig } from '../../../utils/headerConfig';

const Detail = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [totalHari, setTotalHari] = useState();

    const [namaTipeKamar, setNamaTipeKamar] = useState();
    const [idTipeKamar, setIdTipeKamar] = useState();
    const [harga, setHarga] = useState();
    const [deskripsi, setDeskripsi] = useState();
    const [foto, setFoto] = useState();


    const [data, setData] = useState([]);

    const router = useRouter();


    const { id } = router.query;
    useEffect(() => {
        Promise.all([getData()])
        selisiHari()
    }, [id]);

    const getData = () => {
        axios
            .get(`http://localhost:8080/tipe_kamar/${id}`, headerConfig())
            .then((res) => {
                setNamaTipeKamar(res.data.data?.nama_tipe_kamar)
                setHarga(res.data.data?.harga)
                setDeskripsi(res.data.data?.deskripsi)
                setFoto(res.data.data?.foto)
                setIdTipeKamar(res.data.data?.id_tipe_kamar)
            })
    }

    const numberFormat = value =>
        new Intl.NumberFormat("en-ID", {
            style: "currency",
            currency: "IDR"
        }).format(value);


    const [formValue, setFormValue] = useState({
        jumlahKamar: 1,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValue((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };
    const { jumlahKamar } = formValue;

    function selisiHari() {
        if (typeof window !== 'undefined') {
            setStartDate(sessionStorage.getItem('check_in'))
            setEndDate(sessionStorage.getItem('check_out'))
            const tglPertama = Date.parse(sessionStorage.getItem('check_in'))
            const tglKedua = Date.parse(sessionStorage.getItem('check_out'))
            const miliday = 24 * 60 * 60 * 1000;
            const selisih = (tglKedua - tglPertama) / miliday;
            setTotalHari(selisih)
        }
    }

    function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }


    const handleSubmit = () => {
        if (jumlahKamar>0) {
            // if (jumlahKamar < 0) {
            sessionStorage.setItem("date_now", moment(Date.now()).format('YYYY-MM-DD'))
            sessionStorage.setItem("jumlah_kamar", jumlahKamar)
            sessionStorage.setItem("nomor_pemesanan", randomNumber(1000000000, 9999999999))
            sessionStorage.setItem("nama_tipe_kamar", namaTipeKamar)
            sessionStorage.setItem("id_tipe_kamar", idTipeKamar)
            router.push('/pembayaran/metode_pembayaran')
        }
        else {
            Swal.fire({
                title: 'Empty Value',
                text: 'Please fill in date data',
                icon: 'question',
                confirmButtonText: 'Ok'
            })
        }
    }


    return (
        <div>
            <div className='w-full px-5 md:px-[100px] mb-10' >
                <div className='mt-10 md:flex md:gap-7'>
                    <div>
                        <div className='w-full h-[400px] rounded-3xl bg-red-500'>
                            <img src={`http://localhost:8080/image/tipe_kamar/${foto}`} alt="Flowbite Logo" className='w-full h-full lg:object-cover rounded-3xl' />
                        </div>
                        <div className=' lg:flex'>
                            <div className='lg:w-full'>
                                <div className='flex gap-5 mt-5 '>
                                    <div className='py-1 text-purple-800 bg-purple-100 rounded-lg px-7 '>
                                        asdas
                                    </div>
                                    <div className='py-1 text-red-800 bg-red-100 rounded-lg px-7 '>
                                        asdas
                                    </div>
                                    <div className='py-1 text-yellow-800 bg-yellow-100 rounded-lg px-7 '>
                                        asdas
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <h1 className='text-xl font-bold lg:text-4xl lg:font-medium'>Hotelku {namaTipeKamar || ''}</h1>
                                    <h3 className='mt-3 text-lg font-medium lg:text-2xl lg:font-normal'>{numberFormat(harga)} <span className='font-normal text-gray-500'>per malam</span></h3>
                                    <p className='mt-3'>{deskripsi}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full lg:w-2/4 '>
                        <div className='border-gray-300 bg-white dark:border-white border-solid border-[1px] rounded-lg dark:bg-gray-800 px-5'>
                            <div className='mt-3 '>
                                    <h1 className='pb-3 text-xl font-medium border-b-2 border-gray-300 border-solid dark:border-white'>Rincian Harga</h1>

                                    <div className='flex justify-between w-full gap-5 mt-5 '>
                                        <div className='w-full '>
                                            <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Tgl Check In</h2>
                                            <input type='date' disabled className='w-full p-5 text-gray-300 bg-gray-500 rounded-lg ' value={startDate || ''} />
                                        </div>
                                        <div className='w-full '>
                                            <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Tgl Check Out</h2>
                                            <input type='date' disabled className='w-full p-5 text-gray-300 bg-gray-500 rounded-lg ' value={endDate || ''} />
                                        </div>
                                    </div >
                                    <div className='w-full mt-5 pb-[25px] border-b-2 border-solid border-gray-300 dark:border-white'>
                                        <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Jumlah Kamar</h2>
                                        <input placeholder='Insert Jumlah Kamar' id="nomorKamar" type="number" name="jumlahKamar" value={jumlahKamar || ''} onChange={handleChange} className='block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' required />
                                    </div>
                                    <h1 className='mt-4 text-xl font-medium '>Rincian Harga Kamar</h1>
                                    <div className='px-5 py-3 mt-5 bg-gray-100 rounded-lg dark:bg-gray-900'>
                                        <div className='flex justify-between text-lg font-medium'>
                                            <h3 className='text-gray-500'>Tipe Kamar</h3>
                                            <h3>{namaTipeKamar || ''}</h3>
                                        </div>
                                        <div className='flex justify-between mt-3 text-lg font-medium'>
                                            <h3 className='text-gray-500'>Jumlah Kamar</h3>
                                            <h3>{jumlahKamar}</h3>
                                        </div>
                                        <div className='flex justify-between mt-3 text-lg font-medium'>
                                            <h3 className='text-gray-500'>Total Hari</h3>
                                            <h3>{totalHari} Days</h3>
                                        </div>
                                        <div className='flex justify-between mt-3 text-lg font-medium'>
                                            <h3 className='text-gray-500'>Total Harga</h3>
                                            <h3  >{numberFormat(jumlahKamar * harga * totalHari)}</h3>
                                        </div>
                                    </div>
                                    <button onClick={handleSubmit} className='w-full py-3 mt-5 mb-10 text-xl font-medium text-white rounded-lg bg-primary-700'>Bayar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
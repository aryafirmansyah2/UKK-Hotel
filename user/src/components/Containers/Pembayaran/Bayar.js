import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

const Bayar = () => {

    const [open, setOpen] = useState(true)
    const [postSuccess, setPostSuccess] = useState(false)
    const [postFailed, setPostFailed] = useState(false)

    const [nomorPemesanan, setNomorPemesanan] = useState()
    const [idCustomer, setIdCustomer] = useState()
    const [tglPemesanan, setTglPemesanan] = useState()
    const [tglCheckIn, setTglCheckIn] = useState()
    const [tglCheckOut, setTglCheckOut] = useState()
    const [jumlahKamar, setJumlahKamar] = useState()
    const [idTipeKamar, setIdTipeKamar] = useState()
    const [namaTipeKamar, setNamaTipeKamar] = useState()
    const [lamaPenginapan, setLamaPenginapan] = useState()

    const router = useRouter()

    useEffect(() => {

        selisiHari()

        handleAddPemesanan()

        if (typeof window !== 'undefined') {
            setNomorPemesanan(localStorage.getItem('nomor_pemesanan'))
            setIdCustomer(localStorage.getItem('id_customer'))
            setTglPemesanan(localStorage.getItem('date_now'))
            setTglCheckIn(localStorage.getItem('check_in'))
            setTglCheckOut(localStorage.getItem('check_out'))
            setJumlahKamar(localStorage.getItem('jumlah_kamar'))
            setNamaTipeKamar(localStorage.getItem('nama_tipe_kamar'))
            setIdTipeKamar(localStorage.getItem('id_tipe_kamar'))
        }
    }, [selisiHari])

    function selisiHari() {
        const miliday = 24 * 60 * 60 * 1000;
        const tglPertama = Date.parse(tglCheckIn);
        const tglKedua = Date.parse(tglCheckOut);
        const selisih = (tglKedua - tglPertama) / miliday;
        setLamaPenginapan(selisih)
    }

    function handleOpen() {
        setOpen(!open)
    }

    const handleAddPemesanan = async (e) => {
        if (e && e.preventDefault) {

            e.preventDefault();

            const sendData = {
                nomor_pemesanan: nomorPemesanan,
                id_customer: idCustomer,
                tgl_pemesanan: tglPemesanan,
                tgl_check_in: tglCheckIn,
                tgl_check_out: tglCheckOut,
                jumlah_kamar: jumlahKamar,
                id_tipe_kamar: idTipeKamar,
                status_pemesanan: "Baru",
                id_user: null
            };

            axios.post("http://localhost:8080/pemesanan/", sendData)
                .then(() => {
                    setPostSuccess(true);
                    setPostFailed(false);
                    localStorage.removeItem('nomor_pemesanan')
                    localStorage.removeItem('nama_pemesan')
                    localStorage.removeItem('email_pemesan')
                    localStorage.removeItem('date_now')
                    localStorage.removeItem('check_in')
                    localStorage.removeItem('check_out')
                    localStorage.removeItem('jumlah_kamar')
                    localStorage.removeItem('nama_tipe_kamar')
                    localStorage.removeItem('tipe_kamar')
                    localStorage.removeItem('id_tipe_kamar')
                    router.push('/pemesanan')
                })
                .catch((err) => console.log(err));
        }
    }

console.log(tglPemesanan)

    return (
        <div className='flex items-start justify-center w-full h-full gap-10 py-10 '>
            {/* <div className=''> */}
            <div className='w-[500px] border-gray-300 bg-white dark:border-white border-solid border-2 rounded-lg dark:bg-gray-800  px-5 mx-5 lg:mx-0 '>
                <div className='mt-3 '>
                    <div className={`flex items-center justify-between ${open ? "border-b-2" : ""} border-solid border-gray-300 dark:border-white pb-3`}>
                        <h1 className='text-xl font-medium '>Rincian Harga</h1>
                        {open ? <IoIosArrowUp onClick={handleOpen} className='text-lg cursor-pointer' /> : <IoIosArrowDown onClick={handleOpen} className='text-lg cursor-pointer' />}
                    </div>
                    {open ?
                        <div>
                            {/* <div className='w-full lg:flex justify-between gap-5 py-[25px] '>
                                <div className='w-full '>
                                    <h2 className='mb-5 text-lg font-normal text-gray-400 dark:text-gray-500'>Nama Pemesan</h2>
                                    <p className='text-lg font-semibold text-black' >{namaPemesan}</p>
                                </div>
                                <div className='w-full '>
                                    <h2 className='mb-5 text-lg font-normal text-gray-400 dark:text-gray-500'>Email Pemesan</h2>
                                    <p className='text-lg font-semibold text-black' >{emailPemesan}</p>
                                </div>
                            </div> */}
                            <div className='w-full lg:flex justify-between gap-5 py-[25px] '>
                                <div className='w-full '>
                                    <h2 className='mb-5 text-lg font-normal text-gray-400 dark:text-gray-500'>Tanggal Pemesanan</h2>
                                    <p className='text-lg font-semibold text-black' >{tglPemesanan}</p>
                                </div>
                                <div className='w-full '>
                                    <h2 className='mb-5 text-lg font-normal text-gray-400 dark:text-gray-500'>Tanggal Check In</h2>
                                    <p className='text-lg font-semibold text-black' >{tglCheckIn}</p>
                                </div>
                            </div>
                            <div className='w-full lg:flex justify-between gap-5 py-[25px] '>
                                <div className='w-full '>
                                    <h2 className='mb-5 text-lg font-normal text-gray-400 dark:text-gray-500'>Tanggal Check Out</h2>
                                    <p className='text-lg font-semibold text-black' >{tglCheckOut}</p>
                                </div>
                                <div className='w-full '>
                                    <h2 className='mb-5 text-lg font-normal text-gray-400 dark:text-gray-500'>Jumlah Kamar</h2>
                                    <p className='text-lg font-semibold text-black' >{jumlahKamar} Kamar</p>
                                </div>
                            </div>
                            <div className='w-full lg:flex justify-between gap-5 py-[25px] '>
                                <div className='w-full '>
                                    <h2 className='mb-5 text-lg font-normal text-gray-400 dark:text-gray-500'>Tipe Kamar</h2>
                                    <p className='text-lg font-semibold text-black' >{namaTipeKamar}</p>
                                </div>
                                <div className='w-full '>
                                    <h2 className='mb-5 text-lg font-normal text-gray-400 dark:text-gray-500'>Lama Penginapan</h2>
                                    <p className='text-lg font-semibold text-black' >{lamaPenginapan} Hari</p>
                                </div>
                            </div>
                        </div>
                        : <div></div>}

                </div>
            </div>
            <div>
                <div className=' w-[500px] border-gray-300 bg-white dark:border-white border-solid border-2 rounded-lg dark:bg-gray-800  px-5 mx-5 py-5 lg:mx-0 '>
                    <h1 className='text-2xl font-bold'>Gopay</h1>
                    <div className='px-5 mt-5 bg-white border-2 border-gray-300 border-solid rounded-sm dark:border-white dark:bg-gray-800'>
                        <div className='flex items-center justify-between py-3'>
                            <h2>Harga</h2>
                            <h2>-IDR 1.000.000,00</h2>
                        </div>
                        <div className='border-gray-300 bg-white dark:border-white border-solid border-b-[1px] rounded-lg dark:bg-gray-800' />
                        <div className='flex items-center justify-between py-3'>
                            <h2 className='text-lg font-medium text-primary-500'>Total Harga</h2>
                            <h2 className='text-lg font-medium text-primary-500'>-IDR 1.000.000,00</h2>
                        </div>
                    </div>
                    <form onSubmit={handleAddPemesanan}>
                        <button type='submit' className='w-full py-3 mt-5 mb-5 text-xl font-medium text-white rounded-lg bg-primary-700'>Bayar</button>
                    </form>
                </div>

                {postSuccess ? (
                    <div className="p-3 mt-4 bg-green-500 rounded">
                        <p className="text-sm font-bold text-white">
                            Login Sukses, Selamat datang kembali!
                        </p>
                    </div>
                ) : <div></div>}
                {postFailed && (
                    <div className="p-3 mt-4 bg-red-500 rounded">
                        <p className="text-sm font-bold text-white">
                            Username atau Password salah, silakan coba kembali!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Bayar
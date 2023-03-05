import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import Swal from 'sweetalert2'
import { headerConfig } from '../../utils/headerConfig'

const Pemesanan = () => {
    const [data, setData] = useState()
    const [status, setStatus] = useState("")
    const [open, setOpen] = useState(false)
    const [idPemesanan, setIdPemesanan] = useState(null)
    const [idUser, setIdUser] = useState(null)
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    const router = useRouter()

    function Muncul(status, id) {
        setOpen(!open)
        setIdPemesanan(id)
        setStatus(status)
        if (typeof window !== 'undefined') {
            setIdUser(sessionStorage.getItem('id_user'))
        }
    }

    const searchData = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
            setKeyword(query);
        }
    };

    useEffect(() => {
        fetchPemesanan()
    }, [keyword])

    const fetchPemesanan = () => {
        axios.get(`http://localhost:8080/pemesanan/resepsionis?search_query=${query}`, headerConfig())
            .then(function (res) {
                setData(res.data.result)
                console.log(res.data.data)
            });
    }

    const editStatus = () => {

        let data = {
            status_pemesanan: status,
            id_user: idUser
        }
        axios.put(`http://localhost:8080/pemesanan/${idPemesanan}`, data, headerConfig())
            .then(() => {
                setOpen(false)
                router.push('/pemesanan')
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload()
            })
    }

    console.log(query)
    // console.log(status)
    // console.log(idUser)
    // console.log(idPemesanan)

    return (

        <div className="">
            <div className="relative sm:rounded-lg">
                <div className="flex items-center justify-between pb-4">
                    <form onSubmit={searchData}>
                        <div className='flex gap-3'>
                            <select value={query} onChange={(e) => setQuery(e.target.value)} id="countries" className=" w-full bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected value=''>Semua</option>
                                <option value="baru">baru</option>
                                <option value="check_in">check_in</option>
                                <option value="check_out">check_out</option>
                            </select>
                            <button className='p-3 bg-primary-700 rounded-xl '><MdKeyboardArrowRight className='text-white' /></button>
                        </div>
                    </form>
                    <label for="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nomor Pemesanan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Pemesan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email Pemesanan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tgl Pemesan
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tgl Checkin
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tgl Checkout
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jumlah Kamar
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jumlah Kamar
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, i) => (
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.nomor_pemesanan}
                                </th>
                                <td className="px-6 py-4">
                                    {item.customer.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.customer.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item.tgl_pemesanan}
                                </td>
                                <td className="px-6 py-4">
                                    {item.tgl_check_in}
                                </td>
                                <td className="px-6 py-4">
                                    {item.tgl_check_out}
                                </td>
                                <td className="px-6 py-4">
                                    {item.jumlah_kamar}
                                </td>
                                <td className="px-6 py-4">
                                    {item.tipe_kamar?.nama_tipe_kamar}
                                </td>
                                <td className="px-6 py-4">
                                    <div onClick={(e) => Muncul(item.status_pemesanan, item.id_pemesanan)} className={`cursor-pointer px-5 py-2 font-medium border-2 border-solid shadow-xl ${item.status_pemesanan === 'baru' ? "border-purple-600" : item.status_pemesanan === 'check_in' ? "border-yellow-400" : item.status_pemesanan === 'check_out' ? "border-green-500" : "border-blue-600"} ${item.status_pemesanan === 'baru' ? "text-purple-600" : item.status_pemesanan === 'check_in' ? "text-yellow-400" : item.status_pemesanan === 'check_out' ? "text-green-500" : "text-blue-600"} ${item.status_pemesanan === 'baru' ? "text-purple-600" : item.status_pemesanan === 'check_in' ? "text-yellow-400" : item.status_pemesanan === 'check_out' ? "text-green-500" : "text-blue-600"} ${item.status_pemesanan === 'baru' ? "text-purple-600" : item.status_pemesanan === 'check_in' ? "text-yellow-400" : item.status_pemesanan === 'check_out' ? "text-green-500" : "text-blue-600"} rounded-lg`}>
                                        <div className='relative flex items-center justify-between '>
                                            <button>{item.status_pemesanan}</button>
                                            <MdKeyboardArrowRight className='absolute right-0 items-center ' />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={`${open ? 'block' : 'hidden'} `}>
                <div className='fixed top-0 left-0 z-40 w-full h-screen bg-black opacity-60' />
                <div className='fixed top-0 left-0 z-50 flex justify-center w-full' >
                    <div className='p-5 mt-32 bg-white w-[400px] dark:bg-gray-800 rounded-xl'>
                        <h5 className="text-xl font-medium leading-normal text-gray-800 dark:text-gray-50" >Ubah Status</h5>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} id="countries" className="mt-5 w-full bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected value=''>Pilih</option>
                            <option value="baru">baru</option>
                            <option value="check_in">check_in</option>
                            <option value="check_out">check_out</option>
                        </select>
                        <button className='px-5 py-2 mt-10 mr-3 text-white bg-red-600 rounded-lg' onClick={(e) => setOpen(false)}>close</button>
                        <button onClick={editStatus} className='px-5 py-2 mt-10 text-white rounded-lg bg-primary-700 ' >Save</button>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Pemesanan
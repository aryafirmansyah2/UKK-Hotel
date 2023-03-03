import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MdOutlineConfirmationNumber, MdOutlineNightsStay, MdOutlineDoorFront, MdOutlineDateRange } from 'react-icons/md'

const ListPemesanan = () => {

  const [data, setData] = useState([])

  function selisiHari(checkin, checkout) {
    const miliday = 24 * 60 * 60 * 1000;
    const tglPertama = Date.parse(checkin);
    const tglKedua = Date.parse(checkout);
    const selisih = (tglKedua - tglPertama) / miliday;
    return selisih
  }


  const fetchDetailPemesanan = async () => {
    if (typeof window !== 'undefined') {

      await axios.get(`http://localhost:8080/pemesanan/customer/${localStorage.getItem('id_customer')}`)
        .then((res) => {
          setData(res.data.data)
        });
    }
  }

  useEffect(() => {
    Promise.all([fetchDetailPemesanan()])
  }, [])


  return (
    <div className='w-full px-[100px] py-10'>
      <div className='w-full'>
        <div className='flex items-center justify-between w-full'>
          <h1 className='flex-1 w-full text-xl font-medium '>Daftar Riwayat Pemesanan</h1>
          <select id="countries" defaultValue={'DEFAULT'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected value='DEFAULT'>pilih status</option>
            <option selected value='Terbaru'>Terbaru</option>
            <option value="check-in">Check In</option>
            <option value="check-out">Check Out</option>
          </select>
        </div>

        <div className='w-full mt-16 '>
          {data ? data.map((item, i) => (
            <Link key={i} href={`/pemesanan/detail-pemesanan/${item.id_pemesanan}`}>
              <div className='w-full p-5 mt-2 border-b-2 border-gray-300 border-solid rounded-lg dark:border-gray-900 hover:bg-gray-200 dark:hover:bg-gray-700 '>
                <div className='flex items-center justify-between'>
                  <h1 className='text-base font-medium'>{item.tipe_kamar.nama_tipe_kamar}</h1>
                  <div className={`px-5 py-[4px] font-medium border-2 border-solid  ${item.status_pemesanan === 'baru' ? "border-purple-600" : item.status_pemesanan === 'check-in' ? "border-yellow-400" : item.status_pemesanan === 'Check-Out' ? "border-green-500" : "border-blue-600"} ${item.status_pemesanan === 'baru' ? "text-purple-600" : item.status_pemesanan === 'check-in' ? "text-yellow-400" : item.status_pemesanan === 'check-out' ? "text-green-500" : "text-blue-600"} ${item.status_pemesanan === 'Baru' ? "text-purple-600" : item.status_pemesanan === 'Check-In' ? "text-yellow-400" : item.status_pemesanan === 'check-out' ? "text-green-500" : "text-blue-600"} ${item.status_pemesanan === 'Baru' ? "text-purple-600" : item.status_pemesanan === 'Check-In' ? "text-yellow-400" : item.status_pemesanan === 'Check-Out' ? "text-green-500" : "text-blue-600"} rounded-lg uppercase`}>{item.status_pemesanan}</div>
                </div>
                <div className='flex justify-between mt-5 '>
                  <div className='flex items-center gap-5 '>
                    <div className='flex items-center gap-2 '>
                      <div className='text-lg text-gray-500'><MdOutlineConfirmationNumber /></div>
                      <div className='text-sm font-medium tracking-widest text-gray-500'>{item.nomor_pemesanan}</div>
                    </div>
                    <div className='flex items-center gap-2 '>
                      <div className='text-lg text-gray-500'><MdOutlineNightsStay /></div>
                      <div className='text-sm font-medium text-gray-500'>{selisiHari(item.tgl_check_in, item.tgl_check_out)} Days</div>
                    </div>
                    <div className='flex items-center gap-2 '>
                      <div className='text-lg text-gray-500'><MdOutlineDoorFront /></div>
                      <div className='text-sm font-medium text-gray-500'>{item.jumlah_kamar} Rooms</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 '>
                    <MdOutlineDateRange className='text-sm font-medium text-gray-500' />
                    <div className='text-sm font-medium text-gray-500'>{item.tgl_pemesanan}</div>
                  </div>
                </div>
              </div>
            </Link>
          )) : <div> No Data</div>}

        </div>
      </div>
    </div>
  )
}

export default ListPemesanan
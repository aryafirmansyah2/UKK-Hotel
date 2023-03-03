import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const DetailTipeKamar = () => {

  const [namaTipeKamar, setNamaTipeKamar] = useState();
  const [harga, setHarga] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [foto, setFoto] = useState();

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    Promise.all([getData()]);
  }, [id]);

  const getData = async () => {
    await axios
      .get(`http://localhost:8080/tipe_kamar/${id}`)
      .then((res) => {
        setNamaTipeKamar(res.data.data?.nama_tipe_kamar)
        setHarga(res.data.data?.harga)
        setDeskripsi(res.data.data?.deskripsi)
        setFoto(res.data.data?.foto)
        // setId(res.data.data?.id_tipe_kamar)
      })
  }

  return (
    <div>
      <div className='' >
        <div className='flex items-center border-b-2 border-gray-300 border-solid h-28 dark:border-gray-700 '>
          <h1 className='text-4xl font-bold'>Data Kamar</h1>
        </div>

        <div className="grid mt-5 mb-6 md:grid-cols-2" >
          <div className='w-full '>
            <img src={`http://localhost:8080/image/tipe_kamar/${foto}`} alt="Flowbite Logo" className=' rounded-3xl' />
          </div>
          <div className="grid gap-6 mt-5 mb-6 md:grid-cols-1" >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Tipe Kamar</label>
              <input type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={namaTipeKamar || ''} onChange={(e) => setNamaTipeKamar(e.target.value)} disabled />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
              <input type="text" id="company" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" value={harga} disabled />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Deskripsi</label>
              <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." value={deskripsi}></textarea>
            </div>
            <div className='grid grid-cols-2 gap-5'>
              <a href='/tipe_kamar' className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</a>
              <a href={"/tipe_kamar/edit-tipe-kamar/"+id} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Edit</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DetailTipeKamar
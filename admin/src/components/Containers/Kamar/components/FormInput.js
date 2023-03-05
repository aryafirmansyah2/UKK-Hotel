import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import Swal from 'sweetalert2';
import { headerConfig } from '../../../utils/headerConfig';

const FormInput = () => {
  const [open, setOpen] = useState(true)
  const [tipeKamars, setTipeKamars] = useState(0)

  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  const numberRandom = Math.floor(Math.random() * (100 - 999) + 999);

  const handleOpen = () => {
    setOpen(!open)
  }


  const fetchTipeKamar = (e) => {
    axios.get("http://localhost:8080/tipe_kamar/",headerConfig())
      .then(function (res) {
        setTipeKamars(res.data.data)
      });
  }

  const [formValue, setFormValue] = useState({
    tipeKamar: null,
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

  const { tipeKamar } = formValue;

  const handleAddKamar = async (e) => {
    if (e && e.preventDefault) {

      e.preventDefault();

      const sendData = {
        nomor_kamar: numberRandom,
        id_tipe_kamar: tipeKamar
      };

      axios.post("http://localhost:8080/kamar/", sendData, headerConfig())
        .then(() => {
          setStoreSuccess(true);
          setStoreFailed(false);
          // setOpen(false)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,

          })
          setTimeout(() => {
            window.location.reload();
          }, 1400);
        })
        .catch((err) => console.log(err));
    }
  }


  useEffect(() => {
    fetchTipeKamar()
    handleAddKamar()
  }, [])

  console.log(tipeKamar)
  console.log(numberRandom)

  return (
    <div>
      {open ?
        <div>
          <div className='fixed top-0 left-0 z-50 w-full h-screen bg-black opacity-60' />

          <div className='fixed flex items-center justify-center top-0 left-0 w-full h-screen z-[51] '>
            <div className=' w-1/2 pb-10   bg-gray-200 dark:bg-gray-900 opacity-100 z-[51] rounded-3xl border-[1px] border-solid dark:border-gray-300 border-gray-700'>

              <form onSubmit={handleAddKamar}>

                <div className='flex items-center justify-between px-10 py-5 border-b-2 border-gray-300 border-solid dark:border-gray-700 '>
                  <h1 className='text-2xl font-bold '>Add Kamar</h1>
                  <RxCross2 onClick={handleOpen} className='text-2xl cursor-pointer' />
                </div>

                {storeFailed && (
                  <div className="p-3 mt-4 bg-red-500 rounded">
                    <p className="text-sm font-bold text-white">
                      Gagal menambahkan data, silakan coba kembali!
                    </p>
                  </div>
                )}

                {storeSuccess && (
                  <div className="p-3 mt-4 bg-green-500 rounded">
                    <p className="text-sm font-bold text-white">
                      Tambah Data Sukses!
                    </p>
                  </div>
                )}


                <div className='w-full lg:flex justify-between gap-5 py-[15px] px-10 border-b-2 border-solid border-gray-300 dark:border-gray-700 pb-16'>

                  <div className='w-full '>
                    <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Nomor Kamar</h2>
                    <input placeholder='insert nomor kamar' id="nomorKamar" type="text" name="nomorKamar" value={numberRandom} disabled className='block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div>

                  <div className='w-full '>
                    <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Tipe Kamar</h2>
                    <select id="tipeKamar" type="text" name="tipeKamar" defaultValue={tipeKamar} onChange={handleChange} className="block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Choose a tipe kamar</option>
                      {tipeKamars ? tipeKamars.map((item, i) => (
                        <option key={i} value={item.id_tipe_kamar}>{item.nama_tipe_kamar}</option>
                      ))
                        :
                        <option value=''>no data</option>}
                    </select>
                  </div>

                </div >

                <div className='flex items-center justify-end gap-5 px-10 mt-10 '>
                  <button onClick={handleOpen} className='w-32 py-2 text-lg font-medium text-white bg-red-700 rounded-lg'>Cancel</button>
                  <button type='submit' className='w-32 py-2 text-lg font-medium text-white rounded-lg bg-primary-700'>Add</button>
                </div>

              </form>
            </div>
          </div>
        </div>
        :
        <div className='hidden'></div>}
    </div>
  )
}

export default FormInput

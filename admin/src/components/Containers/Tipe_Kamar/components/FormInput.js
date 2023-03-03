import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { useDropzone } from 'react-dropzone';
import { ImFilePicture } from 'react-icons/im'
import Swal from 'sweetalert2';


const FormInput = () => {
  const [open, setOpen] = useState(true)
  const [tipeKamars, setTipeKamars] = useState()

  const [storeSuccess, setStoreSuccess] = useState(false);
  const [storeFailed, setStoreFailed] = useState(false);

  const handleOpen = () => {
    setOpen(!open)
  }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      <div className='w-full px-10'>
        <div className='w-full bg-primary-700 text-white px-3 py-2 rounded-md flex items-center gap-5'>
          <ImFilePicture />
          <p>
            {file.path} - {file.size} bytes
          </p>
        </div>
      </div>
    </li>
  ));

  const fetchTipeKamar = (e) => {
    axios.get("http://localhost:8080/tipe_kamar/")
      .then(function (res) {
        setTipeKamars(res.data.data)
      });
  }

  const [formValue, setFormValue] = useState({
    namaTipeKamar: "",
    harga: null,
    deskripsi: "",
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

  const { namaTipeKamar, harga, deskripsi } = formValue;

  const handleAddTipeKamar = async (e) => {
    if (e && e.preventDefault) {

      e.preventDefault();

      const data = new FormData() 
      data.append("foto",acceptedFiles[0])
      data.append("nama_tipe_kamar",namaTipeKamar)
      data.append("harga",harga)
      data.append("deskripsi",deskripsi)

      axios.post("http://localhost:8080/tipe_kamar/", data)
        .then((res) => {
          setStoreSuccess(true);
          setStoreFailed(false);
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
    // handleAddKamar()
  }, [])

  const numberFormat = value =>
    new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value);


  return (
    <div>
      {open ?
        <div>
          <div className='fixed top-0 left-0 z-50 w-full h-screen bg-black opacity-60' />

          <div className='fixed flex items-center justify-center top-0 left-0 w-full h-screen z-[51] '>
            <div className=' w-1/2 pb-10   bg-gray-200 dark:bg-gray-900 opacity-100 z-[51] rounded-3xl border-[1px] border-solid dark:border-gray-300 border-gray-700'>

              <form onSubmit={handleAddTipeKamar}>

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

                <div className="flex items-center justify-center w-full px-10 mt-5"  {...getRootProps({ className: 'dropzone' })}>
                  <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden"  {...getInputProps()} />
                  </label>
                </div>
                <aside className='mt-5'>
                  <ul>{files}</ul>
                </aside>


                <div className='w-full lg:flex justify-between gap-5 py-[15px] px-10 '>

                  <div className='w-full '>
                    <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Nama Tipe Kamar</h2>
                    <input placeholder='insert nama tipe kamar' id="nomorKamar" type="text" name="namaTipeKamar" value={namaTipeKamar} onChange={handleChange} className='block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div>

                  <div className='w-full '>
                    <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Harga</h2>
                    <input placeholder='insert harga tipe kamar' id="harga" type="number" name="harga" value={harga} onChange={handleChange} className='block w-full px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
                  </div>
                </div >
                <div className='px-10 pb-16 border-b-2 border-gray-300 border-solid dark:border-gray-700'>
                  <h2 className='mb-5 text-lg font-medium text-gray-700 dark:text-gray-500'>Deskripsi</h2>
                  <textarea id="deskripsi" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." name='deskripsi' value={deskripsi} onChange={handleChange}></textarea>
                </div>




                <div className='flex items-center justify-end gap-5 px-10 mt-10 '>
                  <button onClick={handleOpen} className='w-32 text-white py-2 text-lg font-medium rounded-lg bg-primary-700'>Cancel</button>
                  <button type='submit' className='w-32 py-2 text-white text-lg font-medium rounded-lg bg-primary-700'>Add</button>
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

import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { headerConfig } from '../../utils/headerConfig';

const EditUser = () => {

  const [nama, setNama] = useState();
  const [role, setRole] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [foto, setFoto] = useState();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    Promise.all([getData()]);
  }, [id]);

  const getData = async () => {
    await axios
      .get(`http://localhost:8080/user/${id}`, headerConfig())
      .then((res) => {
        setNama(res.data.data?.nama_user)
        setRole(res.data.data?.role)
        setEmail(res.data.data?.email)
        // setPassword(res.data.data?.password)
        setFoto(res.data.data?.foto)
      })
  }

  const updateTipeKamar = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();

      const formData = new FormData();

      formData.append("nama_user", nama);
      formData.append("role", role);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("foto", foto);

      await axios.put(`http://localhost:8080/user/${id}`, formData, headerConfig())
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/user')
          
        })
        .catch((err) => {
          console.log(err)
        })

    }
  };
  return (
    <div>
      <div className='' >
        <div className='flex items-center border-b-2 border-gray-300 border-solid h-28 dark:border-gray-700 '>
          <h1 className='text-4xl font-bold'>Data Kamar</h1>
        </div>

        <form onSubmit={updateTipeKamar}>
          <div className="grid gap-6 mt-5 mb-6 md:grid-cols-1" >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama </label>
              <input type="text" id="first_name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={nama || ''} onChange={(e) => setNama(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
              <select type="text" id="company" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={role} onChange={(e) => setRole(e.target.value)} required >
                <option selected>Choose a role</option>
                <option value="manager">Manager</option>
                <option value="resepsionis">Resepsionis</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="text" id="company" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Passsword</label>
              <input type="text" id="company" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)}  />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Upload multiple files</label>
              <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" onChange={(file) => setFoto(file.target.files[0])} multiple />
            </div>
          </div>

          <div className='flex gap-5'>
            <a href="/tipe_kamar" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Cancel</a>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditUser
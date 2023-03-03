import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri'
import { BiMessageAltDetail } from 'react-icons/bi'
import FormInput from './components/FormInput';
import Swal from 'sweetalert2';


const User = () => {
  const [data, setData] = useState()
  const [open, setOpen] = useState(false)

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUser()
  }, [])


  const fetchUser = () => {
    axios.get("http://localhost:8080/user")
      .then(res => {
        setData(res.data.user)
        setLoading(false)
      });
  }
  console.log(data)

  const numberFormat = value =>
    new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value);

  const handleClickOpen = () => {
    setOpen(!open)
  }

  function hapus(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/user/${id}`)
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
      }
    })
  }


  return (
    <div>
      {open ?
        <div>

          <FormInput setOpen={setOpen} open={open} />
        </div>
        :
        <div />
      }

      <div className='flex items-center border-b-2 border-gray-300 border-solid h-28 dark:border-gray-700 '>
        <h1 className='text-4xl font-bold'>Data User</h1>
      </div>

      <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg ">

        <div className="flex items-center justify-between pb-4 ">
          <div>
            <button onClick={handleClickOpen} className='px-4 py-2 text-white rounded-lg bg-primary-700'>Add User</button>
          </div>
          <label className="sr-only">Search</label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" ></path></svg>
            </div>
            <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3" />
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>

            </tr>
          </thead>
          <tbody>
            {data ? data.map((item, i) => (
              <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                  <img src={`http://localhost:8080/image/user/${item.foto}`} className='w-10 rounded-full' />
                </td>
                <td className="px-6 py-4">
                  {item.nama_user}
                </td>
                <td className="px-6 py-4">
                  {item.email}
                </td>
                <td className="px-6 py-4">
                  {item.role}
                </td>
                <td className="flex gap-5 px-6 py-4 ">
                  <a href={'/user/edit_user/' + item.id_user}><RiEdit2Line className='text-lg hover:text-primary-800' /></a>
                  <button  onClick={() => hapus(item.id_user)}><RiDeleteBin6Line className='text-lg hover:text-red-700' /></button>
                </td>
              </tr>
            )) :
              <tr>
                <td>no data</td>
              </tr>}
          </tbody>
        </table>
        {/* <Pagination postsPerPage={postsPerPage} totalPosts={kamars.length} paginate={paginate} /> */}

      </div>

    </div>
  )
}

export default User
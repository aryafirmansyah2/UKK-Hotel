import Image from 'next/image'
import React, { useState } from 'react'
import Bg from '../../assets/BG/Rectangle 46.png'

import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
// import middleware from '../../utils/middleware'


const PageRegistrasi = () => {
    const router = useRouter();

    const [open, setOpen] = useState(false)
    // const [role, setRole] = useState()
    // const [token, setToken] = useState()
    // const [idUser, setIdUser] = useState()

    const [loggedSuccess, setLoggedSuccess] = useState(false);
    const [loggedFailed, setLoggedFailed] = useState(false);

    function handleClickOpen() {
        setOpen(!open)
    }

    const [formValue, setFormValue] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
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

    const { name, username, email, password } = formValue;

    const handleAddCustomer = async (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();

            const sendData = {
                name: name,
                email: email,
                password: password,
                username: username
            };

            axios
                .post('http://localhost:8080/customer', sendData)
                .then((res) => {
                    if (res.data) {
                        setLoggedSuccess(true);
                        setLoggedFailed(false);
                        router.push('/login')
                    } else {
                        setLoggedSuccess(false);
                        setLoggedFailed(true);
                        // console.log("failed")
                    }
                })
                .catch((err) => console.log(err));
        }
    };



    return (
        <>
            <Head>
                <title>Masuk - Hotelku</title>
            </Head>

            <div className='lg:flex'>
                <div className=''>
                    <Image src={Bg} className='hidden object-cover lg:block lg:h-screen' />
                </div>
                <div className='flex-1'>
                    <div className='flex flex-col items-center justify-center h-screen ' >
                        <div className='w-[70%] '>
                            <div className="flex items-center">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-12 mr-3" alt="Google" />
                                <h1 className="self-center text-3xl font-bold tracking-normal space-nowrap ">Hotelku</h1>
                            </div>
                            <h1 className='mt-20 text-4xl font-bold tracking-wide text-primary-800'>Selamat Datang!</h1>
                            <h1 className='mt-3 text-lg text-gray-500'>Masuk untuk mengakses fitur yang telah tersedia!</h1>

                            {loggedSuccess ? (
                                <div className="p-3 mt-4 bg-green-500 rounded">
                                    <p className="text-sm font-bold text-white">
                                        Login Sukses, Selamat datang kembali!
                                    </p>
                                </div>
                            ) : <div></div>}
                            {loggedFailed && (
                                <div className="p-3 mt-4 bg-red-500 rounded">
                                    <p className="text-sm font-bold text-white">
                                        Username atau Password salah, silakan coba kembali!
                                    </p>
                                </div>
                            )}

                            <form className="pt-6 pb-8 mb-4 " onSubmit={(e) => handleAddCustomer(e)}>
                                <div className="mb-4">
                                    <label className="block mb-2 text-lg font-medium text-gray-700" >
                                        Name
                                    </label>
                                    <input className="w-full px-3 py-5 leading-tight text-gray-700 border-none rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline" id="name" type="text" name="name" onChange={handleChange} value={name} placeholder="Input Your Username" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-lg font-medium text-gray-700" >
                                        Username
                                    </label>
                                    <input className="w-full px-3 py-5 leading-tight text-gray-700 border-none rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" name="username" onChange={handleChange} value={username} placeholder="Input Your Username" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-lg font-medium text-gray-700" >
                                        Email
                                    </label>
                                    <input className="w-full px-3 py-5 leading-tight text-gray-700 border-none rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" name="email" onChange={handleChange} value={email} placeholder="Input Your Username" />
                                </div>
                                <div className="mb-6 ">
                                    <label className="block mb-2 text-lg font-medium text-gray-700" >
                                        Password
                                    </label>
                                    <div className="relative" >
                                        <input className="w-full px-3 py-5 leading-tight text-gray-700 border-none rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type={open ? "text" : "password"} name="password" onChange={handleChange} value={password} placeholder="Input Your Pasword" />
                                        <div className='absolute top-0 right-0 flex items-center h-full mr-10 ' >{open ? <BsFillEyeFill onClick={handleClickOpen} className='text-2xl' /> : <BsFillEyeSlashFill onClick={handleClickOpen} className='text-2xl' />}</div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between ">
                                    <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit" >
                                        Sign Up
                                    </button>
                                    <p href='/sign-up' className='text-gray-700 font-normal'>Already have an account? <a href='/login' className='font-bold text-primary-700'>Log in</a> </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageRegistrasi

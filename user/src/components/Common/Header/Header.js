import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';


import Button from "../Button";
import { classNames } from "../ClassNames";

import { FaBars } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'


const Header = () => {
    const router = useRouter();

    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(false)
    const { pathname } = useRouter();


    useEffect(() => {
        setMounted(true);
    }, []);


    const handleClickOpen = () => {
        setOpen(!open)
    }


    const isMenuActive = (path) => {
        const isHomePage = pathname === '/' && path === '/';

        if (isHomePage) {
            return true;
        }

        return pathname !== '/' && path !== '/' && pathname.includes(path);
    };



    const renderThemeChanger = () => {
        if (!mounted) return null;

        const currentTheme = theme === 'system' ? systemTheme : theme;

        if (currentTheme === 'dark') {
            return (
                <Button className="bg-gray-200 dark:bg-gray-600"
                    onClick={() => setTheme('light')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                </Button>
            )
        } else {
            return (
                <Button className="bg-gray-200"
                    onClick={() => setTheme('dark')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                </Button>
            )
        }
    }

    function handleLogout() {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("id_customer")
        sessionStorage.removeItem("role")
        router.push('/login')
    }

    return (
        <header >
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 ">
                <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto ">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Hotelku</span>
                    </a>
                    <div className="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">

                            <li>
                                <Link href="/beranda" className={classNames(isMenuActive('/beranda') ? 'text-primary-700 ' : 'text-gray-700 , dark:text-gray-400',
                                    'block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700  lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                                )}
                                >
                                    Beranda
                                </Link>
                            </li>

                            <li>
                                <Link href="/cari-kamar" className={classNames(isMenuActive('/cari-kamar') ? 'text-primary-700 ' : 'text-gray-700 , dark:text-gray-400',
                                    'block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700  lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                                )}
                                >
                                    Cari Kamar
                                </Link>
                            </li>

                            <li>
                                <Link href="/pemesanan" className={classNames(isMenuActive('/pemesanan') ? 'text-primary-700 ' : 'text-gray-700 , dark:text-gray-400',
                                    'block py-2 pl-3 pr-4  border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700  lg:p-0  lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700'
                                )}
                                >
                                    Pemesanan
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className="flex items-center lg:order-2">
                        <button onClick={ handleLogout } className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Log Out</button>
                        {renderThemeChanger()}
                        <button data-collapse-toggle="mobile-menu-2" type="button" onClick={handleClickOpen} className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">

                            {open ? <RxCross2 className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>
                {open ?
                    <div className="fixed top-0 left-0 z-10 flex flex-col w-full h-screen px-10 py-5 bg-gray-200 dark:bg-black lg:hidden ">

                        <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center justify-end p-2 ml-1 text-sm text-gray-500 rounded-lg " aria-controls="mobile-menu-2" aria-expanded="false">
                            {open ? <RxCross2 onClick={handleClickOpen} className="text-4xl hover:bg-gray-300 hover:rounded-md " /> : <FaBars className="text-xl" />}
                        </button>

                        <div className={classNames(isMenuActive('/') ? "bg-primary-700 text-white dark:bg-gray-200 dark:text-black" : "bg-white", "w-full h-32 shadow-xl  flex items-center justify-center mt-10  dark:bg-gray-700  ")} >
                            <a href="\" className="flex items-center justify-center w-full h-full text-xl font-bold " >
                                Beranda
                            </a>
                        </div>

                        <div className={classNames(isMenuActive('/rooms') ? "bg-primary-700 text-white dark:bg-gray-200 dark:text-black" : "bg-white",
                            "w-full h-32 shadow-xl bg-white flex items-center justify-center mt-10  dark:bg-gray-700  ")} >
                            <a href="\rooms" className="flex items-center justify-center w-full h-full text-xl font-bold" >
                                Cari Kamar
                            </a>
                        </div>

                        <div className={classNames(isMenuActive('#') ? "bg-primary-700 text-white dark:bg-gray-200 dark:text-black" : "bg-white", "w-full h-32 shadow-xl bg-white flex items-center justify-center mt-10  dark:bg-gray-700  ")} >
                            <a href="\" className="flex items-center justify-center w-full h-full text-xl font-bold" >
                                Pemesanan
                            </a>
                        </div>

                    </div>
                    :
                    <div />}

            </nav>
        </header >
    )
}

export default Header
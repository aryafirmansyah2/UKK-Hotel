import axios from 'axios'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Pagination from '../../../Common/Pagination/Pagination';

const ListkamarPagination = () => {
    const [kamars, setKamars] = useState([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);

    useEffect(() => {
        fetchKamar()
    }, [])


    const fetchKamar = (e) => {
        axios.get("http://localhost:8080/tipe_kamar/")
            .then(function (res) {
                setKamars(res.data.data)
                setLoading(false)
            });
        }
        
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = kamars.slice(indexOfFirstPost, indexOfLastPost);


    // Change page
    const paginate = pageNumber => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 800, behavior: 'smooth' });
    };


    function splitPath(path) {
        const respath = path.split('\\')
        return respath[0] + "/" + respath[1] + "/" + respath[2]
    }

    return (
        <>
            <div className='px-5 mt-20 md:px-[100px]'>
                <div className=''>
                    <div className="w-full ">
                        <div className="flex flex-wrap gap-12 " >
                            {currentPosts ? currentPosts.map((kamars,i) => (
                                <Link href={'/cari_kamar/detail/'+ kamars.id_tipe_kamar} key={i}>
                                    <div className="max-w-sm my-5 overflow-hidden bg-white rounded shadow-lg dark:bg-gray-700" >
                                        <img src={`http://localhost:8080/${splitPath(kamars.foto)}`} alt="Flowbite Logo" className='w-[380px] h-[241px] m-auto' />
                                        <div className="px-6 py-4">
                                            <div className="mb-2 text-xl font-bold">{kamars.nama_tipe_kamar}</div>
                                            <p className="text-base text-gray-700 dark:text-gray-400">
                                                {kamars.deskripsi.substring(0, 100)} ...
                                            </p>
                                        </div>
                                        <div className="px-6 pt-4 pb-2">
                                            <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#photography</span>
                                            <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#travel</span>
                                            <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#winter</span>
                                        </div>
                                    </div>
                                </Link>
                            )) : <div>no data </div>}
                        </div>
                        <Pagination postsPerPage={postsPerPage} totalPosts={kamars.length} paginate={paginate}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListkamarPagination
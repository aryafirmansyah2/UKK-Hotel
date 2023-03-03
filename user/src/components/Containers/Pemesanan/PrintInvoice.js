import React, { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { BiPrinter } from 'react-icons/bi'
import axios from 'axios';
import { useRouter } from 'next/router';

const PrintInvoice = () => {
  const componentRef = useRef();
  const router = useRouter();

  const [data, setData] = useState()
  const [invoice, setInvoice] = useState()
  const [tglPemesanan, setTglPemesanan] = useState()
  const [subTotal, setSubTotal] = useState()

  const [tglCheckIn, setTglCheckIn] = useState()
  const [tglCheckOut, setTglCheckOut] = useState()
  const [jumlahKamar, setJumlahKamar] = useState()
  const [total, setTotal] = useState()
  const [days, setDays] = useState()

  const { id } = router.query;

  useEffect(() => {
    getKamarBoked()
  }, [id])

  const getKamarBoked = async (e) => {
    await axios.get(`http://localhost:8080/detail_pemesanan/${id}`)
      .then((res) => {
        setData(res.data.data)
        console.log(res.data.data)
        setInvoice(res.data.data[0]?.pemesanan.nomor_pemesanan)
        setTglPemesanan(res.data.data[0]?.pemesanan.tgl_pemesanan)
        setTglCheckIn(res.data.data[0]?.pemesanan.tgl_check_in)
        setTglCheckOut(res.data.data[0]?.pemesanan.tgl_check_out)

        const tglPertama = Date.parse(res.data.data[0]?.pemesanan.tgl_check_in)
        const tglKedua = Date.parse(res.data.data[0]?.pemesanan.tgl_check_out)
        const miliday = 24 * 60 * 60 * 1000;
        const selisih = (tglKedua - tglPertama) / miliday;
        setDays(selisih)
        const day = selisih

        setSubTotal(res.data.data[0]?.pemesanan.jumlah_kamar * res.data.data[0]?.kamar.tipe_kamar.harga)
        setJumlahKamar(res.data.data[0]?.pemesanan.jumlah_kamar)
        setTotal(res.data.data[0]?.pemesanan.jumlah_kamar * res.data.data[0]?.kamar.tipe_kamar.harga * day)
      })
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const numberFormat = value =>
    new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR"
    }).format(value);

  return (
    <div className='relative flex items-center justify-center'>
      <button onClick={handlePrint} className="fixed bg-primary-700 text-white  right-0 bottom-0 mb-10 mr-10 p-3 rounded-full"><BiPrinter className='text-5xl ' /></button>

      <div ref={componentRef} className='shadow-xl  h-screen'>
        <section className=" bg-black">
          <div className=" py-16 bg-white h-screen">
            <article className="overflow-hidden">
              <div className="bg-[white] rounded-b-md">
                <div className="p-9">
                  <div className="space-y-6 text-slate-700">
                    <a href="http://localhost:3001/beranda" className="flex ml-2 md:mr-24">
                      <img src="https://flowbite.com/docs/images/logo.svg" className="h-16 mr-3" alt="FlowBite Logo" />
                      <span className="self-center text-xl font-semibold sm:text-4xl whitespace-nowrap dark:text-white">Hotelku</span>
                    </a>
                  </div>
                </div>
                <div className="p-9">
                  <div className="flex w-full">
                    <div className="grid grid-cols-4 gap-12">
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">
                          Invoice Detail:
                        </p>
                        <p>Unwrapped</p>
                        <p>Fake Street 123</p>
                        <p>San Javier</p>
                        <p>CA 1234</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">Billed To</p>
                        <p>The Boring Company</p>
                        <p>Tesla Street 007</p>
                        <p>Frisco</p>
                        <p>CA 0000</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">Invoice Number</p>
                        <p>{invoice}</p>

                        <p className="mt-2 text-sm font-normal text-slate-700">
                          Date of Issue
                        </p>
                        <p>{tglPemesanan}</p>
                      </div>
                      <div className="text-sm font-light text-slate-500">
                        <p className="text-sm font-normal text-slate-700">Terms</p>
                        <p>{days} Days</p>

                        <p className="mt-2 text-sm font-normal text-slate-700">Due</p>
                        <p>{tglCheckOut}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-9">
                  <div className="flex flex-col mx-0 mt-8">
                    <table className="min-w-full divide-y divide-slate-500">
                      <thead>
                        <tr>
                          <th scope="col" className=" hidden py-3.5 px-3 text-left w-40 text-sm font-normal text-slate-700 sm:table-cell">
                            Nomor Kamar
                          </th>
                          <th scope="col" className=" py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                            Nama Tipe Kamar
                          </th>
                          <th scope="col" className=" hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                            Tgl Check In
                          </th>
                          <th scope="col" className=" hidden py-3.5 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                            Tgl Check Out
                          </th>
                          <th scope="col" className=" py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                            Harga
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data ? data.map((item, i) => (
                          <tr key={i} className="border-b border-slate-200">
                            <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                              {item.kamar.nomor_kamar}
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-left text-slate-500 sm:table-cell">
                              {item.kamar.tipe_kamar.nama_tipe_kamar}
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              {item.pemesanan.tgl_check_in}
                            </td>
                            <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                              {item.pemesanan.tgl_check_out}
                            </td>
                            <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                              {numberFormat(item.kamar.tipe_kamar.harga)}
                            </td>
                          </tr>
                        )) :
                          <tr>
                            <td>no data</td>
                          </tr>}

                      </tbody>
                      <tfoot className=' '>
                        <tr>
                          <th scope="row" colSpan="4" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                            Subtotal
                          </th>
                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {numberFormat(subTotal)}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="4" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                            Total Kamar
                          </th>
                          <th scope="row" className="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                            Total Kamar
                          </th>
                          <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {jumlahKamar} Rooms
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="4" className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                            Days
                          </th>
                          <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                            Days
                          </th>
                          <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {days} Days
                          </td>
                        </tr>
                        <tr>
                          <th scope="row" colSpan="4" className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                            Total
                          </th>
                          <th scope="row" className="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
                            Total
                          </th>
                          <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                            {numberFormat(total)}
                           </td>
                        </tr>
                      </tfoot>
                    </table>
                    {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            No Kamar
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Nomor Tipe Kamar
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Tgl Check In
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Tgl Check Out
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                          <tr key={i} className="bg-gray-50  dark:bg-gray-800  dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            </th>
                            <td className="px-6 py-4">
                              {item.kamar.tipe_kamar.nama_tipe_kamar}
                            </td>
                            <td className="px-6 py-4">
                              {item.pemesanan.tgl_check_in}
                            </td>
                            <td className="px-6 py-4">
                              {item.pemesanan.tgl_check_out}
                            </td>
                          </tr>
                      </tbody>
                    </table> */}
                  </div>
                </div>

                <div className=" px-9">
                  <div className="border-t pt-9 border-slate-200">
                    <div className="text-sm font-light text-slate-700 ">
                      <p>
                        Payment terms are 14 days. Please be aware that according to the
                        Late Payment of Unwrapped Debts Act 0000, freelancers are
                        entitled to claim a 00.00 late fee upon non-payment of debts
                        after this time, at which point a new invoice will be submitted
                        with the addition of this fee. If payment of the revised invoice
                        is not received within a further 14 days, additional interest
                        will be charged to the overdue account and a statutory rate of
                        8% plus Bank of England base of 0.5%, totalling 8.5%. Parties
                        cannot contract out of the Act’s provisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PrintInvoice
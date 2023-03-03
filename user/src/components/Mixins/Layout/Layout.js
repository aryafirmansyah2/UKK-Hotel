import Head from "next/head"
import Footer from "../../Common/Footer/Footer"
import Header from "../../Common/Header/Header"

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Hotelku</title>
        <meta name="description" content="Create dark mode in next and tailwind" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
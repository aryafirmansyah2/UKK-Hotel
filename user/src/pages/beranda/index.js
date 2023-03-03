import React from "react";
import Beranda from "../../components/Containers/Beranda/Beranda"
import Layout from "../../components/Mixins/Layout/Layout"
import ProtectPage from "../../components/utils/ProtectPage";

const index = () => {
  ProtectPage()
  return (
    <Layout>
      <Beranda />
    </Layout   >
  )
}

export default index
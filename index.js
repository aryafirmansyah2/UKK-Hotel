//import
const express = require('express');
const cors = require('cors');
const path = require('path')

//implementasi
const app = express();
app.use(cors());

//endpoint nanti ditambahkan di sini
app.use('/image/user', express.static(path.join(__dirname,'./image/user')))
app.use('/image/tipe_kamar', express.static(path.join(__dirname,'./image/tipe_kamar')))

const User = require('./routes/user');
app.use("/user", User)

const Tipe_kamar = require('./routes/tipe_kamar');
app.use("/tipe_kamar", Tipe_kamar)

const Kamar = require('./routes/kamar')
app.use("/kamar", Kamar)

const Pemesanan = require('./routes/pemesanan')
app.use('/pemesanan', Pemesanan)

const Detail_pemesanan = require('./routes/detail_pemesanan')
app.use('/detail_pemesanan', Detail_pemesanan)

//run server
app.listen(8080, () => {
    console.log('server run on port 8080')
})
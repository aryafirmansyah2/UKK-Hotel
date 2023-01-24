//import express
const express = require("express")

const app = express()
app.use(express.json())

//import model
const models = require("../models/index")
const Pemesanan = models.pemesanan
const Tp_kamar = models.tipe_kamar
const User = models.user

app.get("/", (req, res) => {
    Pemesanan.findAll({include: ["tipe_kamar" ,"user"]})
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(err => {
        res.json({
            msg: err.massage
        })
    })
})

app.get("/:id", (req, res) => {
    let param = ({id_pemesanan: req.params.id})
    Pemesanan.findOne({where:param, include: ["tipe_kamar" ,"user"]})
    .then(result => {
        res.json({
            data: result
        })
    })
    .catch(err => {
        res.json({
            msg: err.massage
        })
    })
})

app.post("/", (req, res) => {

    let tw = Date.now()
    let data = {
        nomor_pemesanan: req.body.nomor_pemesanan,
        nama_pemesanan: req.body.nama_pemesanan,
        email_pemesanan: req.body.email_pemesanan,
        tgl_pemesanan: new Date(tw),
        tgl_check_in: req.body.tgl_check_in,
        tgl_check_out: req.body.tgl_check_out,
        nama_tamu: req.body.nama_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
        status_pemesanan: req.body.status_pemesanan,
        id_user: req.body.id_user
    }

    Pemesanan.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/:id",  (req, res) => {
    let param = { id_pemesanan: req.params.id }
    let tw = Date.now()
    let data = {
        nomor_pemesanan: req.body.nomor_pemesanan,
        nama_pemesanan: req.body.nama_pemesanan,
        email_pemesanan: req.body.email_pemesanan,
        tgl_pemesanan: new Date(tw),
        tgl_check_in: req.body.tgl_check_in,
        tgl_check_out: req.body.tgl_check_out,
        nama_tamu: req.body.nama_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
        status_pemesanan: req.body.status_pemesanan,
        id_user: req.body.id_user
    }

    Pemesanan.update(data, { where: param, include:['tipe_kamar','user'] })
        .then(result => {
            res.json({
                message: "data has been updated",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", async (req, res) => {
    try {
        let param = { id_pemesanan: req.params.id }
        let result = await Pemesanan.findOne({ where: param , include:['tipe_kamar','user']})

        // delete data
        Pemesanan.destroy({ where: param, include:['tipe_kamar','user'] })
            .then(result => {

                res.json({
                    message: "data has been deleted",
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})




module.exports = app
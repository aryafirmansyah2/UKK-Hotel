//import express
const express = require("express")

const app = express()
app.use(express.json())

const auth = require("../auth")

// import md5
const md5 = require("md5")

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//import model
const models = require("../models/index")
const Kamar = models.kamar
const Tp_kamar = models.tipe_kamar

app.get("/", (req, res) => {
    Kamar.findAll({include: ["tipe_kamar"] })
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
    let param = ({ id_kamar: req.params.id })
    Kamar.findAll({ where: param, include: ["tipe_kamar"] })
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

    let data = {
        nomor_kamar: req.body.nomor_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
    }

    Kamar.create(data)
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
    let param = { id_kamar: req.params.id }
    let data = {
        nomor_kamar: req.body.nomor_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
    }

    Kamar.update(data, { where: param, include:['tipe_kamar'] })
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
        let param = { id_kamar: req.params.id }
        let result = await Kamar.findOne({ where: param , include:['tipe_kamar']})

        // delete data
        Kamar.destroy({ where: param, include:['tipe_kamar'] })
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
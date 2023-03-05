//import express
const express = require("express")
const auth = require("../auth")


const app = express()
app.use(express.json())

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//import model
const models = require("../models/index")
const Tp_kamar = models.tipe_kamar

const checkFileType = function (file, cb) {
    //Allowed file extensions
    const fileTypes = /jpeg|jpg|png|gif|svg/;

    //check extension names
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: You can Only Upload Images!!");
    }
};

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "./image/tipe_kamar")
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
})

app.get("/", auth, (req, res) => {
    Tp_kamar.findAll()
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

app.get("/:id", auth, (req, res) => {
    let param = { id_tipe_kamar: req.params.id }

    Tp_kamar.findOne({ where: param })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(err => {
            res.json({
                masg: err.massage
            })
        })
})

app.post("/", auth, upload.single("foto"), (req, res) => {

    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            nama_tipe_kamar: req.body.nama_tipe_kamar,
            harga: req.body.harga,
            deskripsi: req.body.deskripsi,
            foto: req.file.filename
        }

        Tp_kamar.create(data)
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
    }
})

app.put("/:id", auth, upload.single("foto"), (req, res) => {
    let param = { id_tipe_kamar: req.params.id }
    let data = {
        nama_tipe_kamar: req.body.nama_tipe_kamar,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
        // foto: req.body.filename
    }
    if (req.file) {
        // get data by id
        Tp_kamar.findOne({ where: param })
            .then(result => {
                let oldFileName = result.foto

                // delete old file
                let dir = path.join(__dirname, "./image/tipe_kamar", oldFileName)
                fs.unlink(dir, err => console.log(err))
            })
            .catch(error => {
                console.log(error.message);
            })

        // set new filename
        data.foto = req.file.filename
    }
    console.log(data)

    Tp_kamar.update(data, { where: param })
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", auth, async (req, res) => {
    try {
        let param = { id_tipe_kamar: req.params.id }
        let result = await Tp_kamar.findOne({ where: param })
            .then(result => {

                let oldFileName = result.foto

                // delete old file
                let dir = path.join(__dirname, "./image/tipe_kamar", oldFileName)
                fs.unlink(dir, err => console.log(err))
            })
            .catch(err => {
                console.log(err)
            })

        // delete data
        Tp_kamar.destroy({ where: param })
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
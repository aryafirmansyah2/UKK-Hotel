//import express
const express = require("express")

const app = express()
app.use(express.json())


// import md5
const md5 = require("md5")

//import multer
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//import model
const models = require("../models/index")
const User = models.user

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

//config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image/user")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({
    storage: storage, 
    limits: { fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
})

app.get("/", (req, res) => {
    User.findAll()
        .then(result => {
            res.json({
                user: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk melihat user berdasarkan id
app.get("/:id", (req, res) => {
    let param = { id_user: req.params.id }

    User.findOne({ where: param })
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(err => {
            res.json({
                msg: err.message
            })
        })
})

//endpoint untuk menyimpan data admin, METHOD: POST, function: create
app.post("/", upload.single("foto"), (req, res) => {

    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            nama_user: req.body.nama_user,
            foto: req.file.path,
            email: req.body.email,
            password: md5(req.body.password),
            role: req.body.role
        }
        User.create(data)
            .then(result => {
                res.json({
                    message: "data has been inserted",
                    data: result,
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })
    }
})

app.put("/:id", upload.single("foto"), (req, res) => {
    let param = { id_user: req.params.id }
    let data = {
        nama_user: req.body.nama_user,
        foto: req.body.path,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role
    }
    if (req.file) {
        // get data by id
        const row = User.findOne({ where: param })
            .then(result => {
                let oldFileName = result.foto

                // delete old file
                let dir = path.join(__dirname, "./image/user", oldFileName)
                fs.unlink(dir, err => console.log(err))
            })
            .catch(error => {
                console.log(error.message);
            })

        // set new filename
        data.foto = req.file.path
    }

    if (req.body.password) {
        data.password = md5(req.body.password)
    }

    User.update(data, { where: param })
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

app.delete("/:id", async (req, res) => {
    try {
        let param = { id_user: req.params.id }
        let result = await User.findOne({ where: param })
        let oldFileName = result.foto

        // delete old file
        let dir = path.join(__dirname, "./image/user", oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        User.destroy({ where: param })
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
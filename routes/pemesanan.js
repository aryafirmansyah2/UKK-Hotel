//import express
const express = require("express")
const detail_pemesanan = require("../models/detail_pemesanan")

const app = express()
app.use(express.json())

const sequelize = require(`sequelize`);
const operator = sequelize.Op;

//import model
const models = require("../models/index")
const Pemesanan = models.pemesanan
const Tp_kamar = models.tipe_kamar
const Kamar = models.kamar
const Detail_pemesanan = models.detail_pemesanan

app.get("/", (req, res) => {
    Pemesanan.findAll({ include: ["tipe_kamar", "user"] })
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
    let param = ({ id_pemesanan: req.params.id })
    Pemesanan.findOne({ where: param, include: ["tipe_kamar", "user", 'customer'] })
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
app.get("/customer/:id", (req, res) => {
    let param = ({ id_customer: req.params.id })
    Pemesanan.findAll({ where: param, include: ["tipe_kamar", "user", 'customer'] })
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

app.post('/', async (req, res) => {
    let tw = Date.now()

    let numberRandom = Math.floor(Math.random() * (10000000 - 99999999) + 99999999);

    let requestData = {
        nomor_pemesanan: numberRandom,
        id_customer: req.body.id_customer,
        tgl_pemesanan: tw,
        tgl_check_in: req.body.tgl_check_in,
        tgl_check_out: req.body.tgl_check_out,
        nama_tamu: req.body.nama_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
        status_pemesanan: req.body.status_pemesanan,
        id_user: req.body.id_user
    
    };

    // rooms data
    let dataKamar = await Kamar.findAll({
        where: {
            id_tipe_kamar: requestData.id_tipe_kamar,
        },
    });

    // room type data
    let dataTipeKamar = await Tp_kamar.findOne({
        where: { id_tipe_kamar: requestData.id_tipe_kamar },
    });

    //  booking data
    let dataPemesanan = await Tp_kamar.findAll({
        attributes: ["id_tipe_kamar", "nama_tipe_kamar"],
        where: { id_tipe_kamar: requestData.id_tipe_kamar },
        include: [
            {
                model: Kamar,
                as: "kamar",
                attributes: ["id_kamar", "id_tipe_kamar"],
                include: [
                    {
                        model: Detail_pemesanan,
                        as: "detail_pemesanan",
                        attributes: ["tgl_akses"],
                        where: {
                            tgl_akses: {
                                [operator.between]: [
                                    requestData.tgl_check_in,
                                    requestData.tgl_check_out,
                                ],
                            },
                        },
                    },
                ],
            },
        ],
    });

    // get available rooms
    let bookedRoomIds = dataPemesanan[0].kamar.map((room) => room.id_kamar);
    let availableRooms = dataKamar.filter((room) => !bookedRoomIds.includes(room.id_kamar));


    // process add data room where status is available to one list
    let roomsDataSelected = availableRooms.slice(0, requestData.jumlah_kamar);

    //count day
    let checkInDate = new Date(requestData.tgl_check_in);
    let checkOutDate = new Date(requestData.tgl_check_out);
    const dayTotal = Math.round(
        (checkOutDate - checkInDate) / (1000 * 3600 * 24)
    );

    // process add detail
    if (
        dataKamar == null ||
        availableRooms.length < requestData.jumlah_kamar ||
        dayTotal == 0 ||
        roomsDataSelected == null
    ) {
        return res.json({
            message: "Room not available!",
        });
    } else {
        await Pemesanan
            .create(requestData)
            .then(async (result) => {
                // process to add booking detail
                for (let i = 0; i < dayTotal; i++) {
                    for (let j = 0; j < roomsDataSelected.length; j++) {
                        let tgl_akses = new Date(checkInDate);
                        tgl_akses.setDate(tgl_akses.getDate() + i);
                        let requestDataDetail = {
                            id_pemesanan: result.id_pemesanan,
                            id_kamar: roomsDataSelected[j].id_kamar,
                            tgl_akses: tgl_akses,
                            harga: dataTipeKamar.harga,
                        };
                        await Detail_pemesanan.create(requestDataDetail);
                    }
                }
                return res.json({
                    data: result,
                    statusCode: res.statusCode,
                    message: "New user has been created",
                });
            })
            .catch((error) => {
                return res.json({
                    message: error.message,
                });
            });
    }
})


app.put("/:id", (req, res) => {
    let param = { id_pemesanan: req.params.id }
    let tw = Date.now()
    let data = {
        nomor_pemesanan: req.body.nomor_pemesanan,
        id_customer: req.body.id_customer,
        tgl_pemesanan: new Date(tw),
        tgl_check_in: req.body.tgl_check_in,
        tgl_check_out: req.body.tgl_check_out,
        nama_tamu: req.body.nama_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        id_tipe_kamar: req.body.id_tipe_kamar,
        status_pemesanan: req.body.status_pemesanan,
        id_user: req.body.id_user
    }

    Pemesanan.update(data, { where: param, include: ['tipe_kamar', 'user'] })
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
        let result = await Pemesanan.findOne({ where: param, include: ['tipe_kamar', 'user'] })

        // delete data
        Pemesanan.destroy({ where: param, include: ['tipe_kamar', 'user'] })
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
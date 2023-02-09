//import express
const express = require("express")
//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

require("dotenv").config();

const app = express()
app.use(express.json())


// import md5
const bcrypt = require("bcrypt");

//import model
const models = require("../models/index")
const User = models.user

app.post('/login', async (req, res) => {
    let data = {
        email: req.body.email
    }
    const user = await User.findOne({ where: data });
    if (user) {
        const password_valid = await bcrypt.compare(req.body.password, user.password);
        if (password_valid) {
            token = jwt.sign({ "id": user.id_user, "email": user.email }, process.env.JWT_KEY
            );
            req.session.userId = user.id_user;
            res.status(200).json({ token: token, role: user.role, "logged": true });
        } else {
            res.status(400).json({ error: "Password Incorrect" });
        }

    } else {
        res.status(404).json({ error: "User does not exist" });
    }

});

app.post('/me', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    const user = await User.findOne({
        attributes: ['id_user', 'email', 'role'],
        where: {
            id_user: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(user);
});

app.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
        res.status(200).json({ msg: "Anda telah logout" });
    });
});

module.exports = app
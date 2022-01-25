const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const {
    userModel,
    userSchema
} = require('../database/schema/userSchema');

const SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
router.post('/register', async (req, res) => {
    let plainPassword = req.body.password;
    //Check if password has at least 8 characters, one number and one special character
    let hashedPassword = "";
    if (plainPassword.length < 8 || !plainPassword.match(/[0-9]/) || !plainPassword.match(/[!@#$%^&*]/)) {
        res.status(400).json({
            ok: false,
            message: "Password must have at least 8 characters, one number and one special character"
        });
        //Hash the password with bcrypt and salt the password
    } else {
        let salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(plainPassword, salt);
    }
    let user = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        email: req.body.email,
        telefonNumber: req.body.telefonNumber,
        garden: req.body.garden,
        tasks: req.body.tasks,
        presenceTime: req.body.presenceTime
    }
    console.log(user);
    try {
        await userModel.create(user)
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({
                ok: false,
                message: "Username already exists"
            });
        } else {
            res.status(500).json({
                ok: false,
                message: "Something went wrong"
            });
        }
    }
    res.status(200).json({
        ok: true,
        message: "User created"
    });
});

router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;
    console.log(username, password);

    const user = await userModel.findOne({
        username: username
    }).lean();
    console.log(!user);
    if (!user) {
        res.status(400).send({
            ok: false,
            message: "Username or password is incorrect"
        });
        return;
    }
    if (await bcrypt.compare(password, user.password)) {
        return res.status(200).send({
            ok: true,
            data: {
                token: jwt.sign({
                    userId: user._id,
                    username: user.username
                }, SECRET_TOKEN, {
                    expiresIn: '1h'
                })
            }
        });
    }
    res.status(400).send({
        ok: false,
        message: "User or password is incorrect"
    });
});

router.get('/verify', async (req, res, next) => {
    const token = req.headers['cookie']?.split('=')[1];
    if (typeof token === 'undefined') {
        res.status(400).send({
            ok: false,
            message: "No token provided"
        })
    } else {
        jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    ok: false,
                    message: "Token is invalid"
                })
            } else {
                res.status(200).send({
                    ok: true,
                    data: decoded
                })
            }
        })
    }
})
user = {
    "username": "test",
    "firstName": "te",
    "lastName": "st",
    "plainPassword": "test123",
    "email": "test@mail.com",
    "telefonNumber": "123456789",
    "garden": [],
    "tasks": [],
}
module.exports = router;
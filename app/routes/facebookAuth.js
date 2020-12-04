const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt");
const User = require("../models/userModel");



router.post("/add-fb-data", (req, res) => {
    const body = {
        username: req.body.username,
        email: req.body.email,
        phone_number: req.body.phone_number,
        acount_type: "Acount Type",
        password: req.body.password,
        fbId: req.body.fbId,
        workNEducetion: { "empty": "Empty" },
        companyDetails: { "empty": "Empty" },
        my_ref_codes: [],
        used_ref_codes: [],
        commision: "0",
        date: new Date().getTime(),
        status:true,
        wishlist:[]
    }


    // User.find({ email: req.body.email }).exec().
    //     then((user) => {
    //         if (user.length >= 1) {
    //             return res.send({
    //                 code: 300,
    //                 message: "The email address already in use. please try to another email address"
    //             })
    //         }
    //         else {
    User.find({ fbId: req.body.fbId }).exec().
        then((user) => {
            if (user.length >= 1) {
                User.updateOne({ fbId: req.body.fbId }, {
                    username: req.body.username,
                    email: req.body.email,
                    phone_number: req.body.phone_number,
                    acount_type: "Acount Type",
                    // password: req.body.password,
                }).then((suc) => {
                    res.send({
                        message: "User Updated!",
                        code: 200,
                    })
                }).catch(() => {
                    res.send({
                        code: 300,
                        message: "The email address already in use. please try to another email address"
                    })
                })
            }
            else {
                const user = new User(body)
                user.save().then((success) => {
                    res.send({
                        message: "User Created",
                        code: 200,
                        user
                    })
                }).catch((err) => {
                    res.status(500).json({
                        error: err
                    })
                })

            }
        })
    //     }
    // })
})




router.get("/get", (req, res) => {
    User.find({ fbId: req.query.fbId }).exec().
        then((user) => {
            res.send({ code: 200, user })
        }).catch((e) => {
            res.send({ e })
        });
});






module.exports = router

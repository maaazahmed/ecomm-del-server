const express = require("express")
const adminAccount = express.Router()
const bcrypt = require("bcrypt");
const SupperAdmin = require("../models/AdimAuthModal")


// ====>>>  Sign Up Route 
// ====>>>  URL http://localhost:8000/account/signup
// adminAccount.post("/signup", (req, res) => {
//     SupperAdmin.find({ email: req.body.email }).exec().
//         then((user) => {
//             if (user.length >= 1) {
//                 return res.status(409).json({
//                     message: "Mail exists"
//                 })
//             }
//             else {
//                 bcrypt.hash(req.body.password, 10, (err, hash) => {
//                     if (err) {
//                         res.status(500).json({
//                             error: err
//                         });
//                     }
//                     else {
//                         const supperAdmin = new SupperAdmin({
//                             username: req.body.username,
//                             email: req.body.email,
//                             acount_type: req.body.acount_type,
//                             password: hash
//                         })
//                         supperAdmin.save().then((success) => {
//                             res.status(201).json({
//                                 message: "User Created"
//                             })
//                         }).catch((err) => {
//                             res.status(500).json({
//                                 error: err
//                             })
//                         })
//                     }
//                 })
//             }
//         })
// })

// ====>>>  Sign In Route
// ====>>>  URL http://localhost:8000/account/signin



adminAccount.post("/signin", (req, res) => {
    SupperAdmin.find({ email: req.body.email }).exec().
        then((user) => {
            if (user < 1) {
                res.send({
                    message: "Invalid email or password !"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                if (err) {
                    await res.send({
                        userId: "Auth field"
                    })
                }
                else if (result) {
                    await res.status(200).json({
                        message: "Login Successful",
                        user: user[0]
                    })
                }
                else {
                    await res.send({
                        userId: "Invalid email or password !"
                    })
                }
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = adminAccount
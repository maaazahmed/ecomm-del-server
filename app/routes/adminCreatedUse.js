const express = require("express")
const userCreation = express.Router()
const bcrypt = require("bcrypt");
const AdminCreatedUsers = require("../models/AdminCreatedUsersModal")



// ====>>>  Sign Up Route 
// ====>>>  URL http://localhost:8000/account/signup
userCreation.post("/add", (req, res) => {
    AdminCreatedUsers.find({ email: req.body.email }).exec().
        then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const adminCreatedUsers = new AdminCreatedUsers({
                            username: req.body.username,
                            email: req.body.email,
                            acount_type: "Acount Type",
                            password: hash
                        })
                        adminCreatedUsers.save().then((success) => {
                            res.status(201).json({
                                message: "User Created"
                            })
                        }).catch((err) => {
                            res.status(500).json({
                                error: err
                            })
                        })
                    }
                })
            }
        })
})

module.exports = userCreation





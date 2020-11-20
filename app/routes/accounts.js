const express = require("express")
const account = express.Router()
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const e = require("express");



account.post("/signup", (req, res) => {
    // User.find({ email: req.body.email }).exec()
    User.find({
        $and: [
            {
                $or: [{ email: req.body.email },
                { phone_number: req.body.phone_number }]
            },
        ]
    }).exec()
        .then((user) => {
            if (user.length >= 1) {
                if (user[0].email === req.body.email) {
                    return res.send({
                        code: 300,
                        message: "The email address already in use. please try to another email address"
                    })
                } if (user[0].phone_number === req.body.phone_number) {
                    return res.send({
                        code: 300,
                        message: "The phone number already in use. please try to another email address"
                    })
                }
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        const user = new User({
                            username: req.body.username,
                            email: req.body.email,
                            phone_number: req.body.phone_number,
                            acount_type: "Acount Type",
                            password: hash,
                            workNEducetion: { "empty": "Empty" },
                            companyDetails: { "empty": "Empty" },
                            my_ref_codes: [],
                            used_ref_codes: [],
                            commision: "0",
                            fbId: "null",
                            date: new Date().getTime(),
                            status: true
                        })
                        user.save().then((success) => {
                            res.send({
                                message: "User Created",
                                code: 200,
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

// ====>>>  Sign In Route
// ====>>>  URL http://localhost:8000/account/signin
account.post("/signin", (req, res) => {
    User.find({ email: req.body.email }).exec().
        then((user) => {
            if (user < 1) {
                res.send({
                    message: "Invalid email or password !",
                    code: 300
                })
            }
            bcrypt.compare(req.body.password, user[0].password, async (err, result) => {
                if (err) {
                    await res.status(401).json({
                        userId: "Auth field"
                    })
                }
                else if (result) {
                    user[0].password = req.body.password
                    await res.send({
                        message: "Login Successful!",
                        user: user[0],
                        code: 200,
                        result
                    })
                }
                else {
                    await res.send({
                        message: "Invalid email or password !",
                        code: 300
                    })
                }
            })
        }).catch((err) => {
            res.status(500).json({
                error: err
            })
        })
})


// ====>>>  Update Route
// ====>>>  URL http://localhost:8000/account/updateUser
account.put("/forgetpssword", (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            User.updateOne({ _id: req.body._id }, { $set: { password: hash } }, (error, success) => {
                if (error) {
                    res.send({
                        message: "Update fail !",
                        error
                    })
                }
                else {
                    res.send({
                        message: "Password Successfuly updated!",
                        success
                    })
                }
            })
        }
    })
})


account.put("/update", (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        }
        else {
            const user = {
                username: req.body.username,
                email: req.body.email,
                phone_number: req.body.phone_number,
                acount_type: "Acount Type",
                password: hash
            }
            User.updateOne({ _id: req.body._id }, user, (error, success) => {
                if (error) {
                    res.send({
                        message: "Update fail !",
                        error,
                        code: 200
                    })
                } else {
                    res.send({
                        message: "Successfuly updated !",
                        success
                    })
                }
            })
        }
    })
})






account.post("/add-work-edu", (req, res) => {
    User.updateOne({ _id: req.body._id }, { $set: { "workNEducetion": req.body.workNEducetion } }, (error, success) => {
        if (error) {
            res.send({
                message: "Update fail !",
                error,
                code: 200
            })
        } else {
            res.send({
                message: "Successfuly updated !",
                success
            })
        }
    })
})



account.post("/my-ref-code", (req, res) => {
    User.find({ _id: req.body._id }).exec().then((data) => {
        if (data[0]) {
            let codeArr = data[0].my_ref_codes
            codeArr.push(req.body)
            console.log(codeArr)
            User.updateOne({ _id: req.body._id }, { $set: { "my_ref_codes": codeArr } }, (error, success) => {
                if (error) {
                    res.send({
                        message: "Update fail !",
                        error,
                        code: 200
                    })
                } else {
                    res.send({
                        message: "Successfuly updated !",
                        success
                    })
                }
            })
        }
    })
})


// account.post("/use-ref-code", (req, res) => {
//     User.find({ "my_ref_codes.ref_codes": req.body.ref_codes }, (err, result) => {
//         if (err) {
//             res.send({
//                 message: "Somthing wrong",
//                 error: err,
//                 code: 300
//             })
//         } else {
//             if (result[0]) {
//                 let codsObj = result[0].my_ref_codes.find((v) => v.ref_codes == req.body.ref_codes)
//                 if (codsObj._id == req.body._id) {
//                     res.send({ code: 300, message: "You can't yous this code" })
//                     return
//                 }
//                 else {
//                     if (codsObj.status == "Active") {
//                         User.find({ _id: req.body._id }).exec().then((data) => {
//                             if (data[0]) {
//                                 let codeArr = data[0].used_ref_codes
//                                 codeArr.push(req.body)
//                                 User.updateOne({ _id: req.body._id }, { $set: { "used_ref_codes": codeArr } }, (error, success) => {
//                                     if (error) {
//                                         res.send({
//                                             message: "Applied fail !",
//                                             error,
//                                             code: 300
//                                         })
//                                     } else {
//                                         User.update({
//                                             _id: codsObj._id,
//                                             my_ref_codes: {
//                                                 $elemMatch: {
//                                                     ref_codes: req.body.ref_codes
//                                                 }
//                                             }
//                                         }, {
//                                             '$set': { 'my_ref_codes.$.status': 'used' },
//                                         }, (err, suc) => {
//                                             if (err) {
//                                                 res.send({
//                                                     message: "Applied fail !",
//                                                     error,
//                                                     code: 300
//                                                 })
//                                             } else {
//                                                 res.send({
//                                                     message: "Code Applied",
//                                                     success: suc,
//                                                     code: 200
//                                                 })
//                                             }
//                                         })
//                                     }
//                                 })
//                             }
//                         })
//                     } else {
//                         res.send({
//                             message: "Already used",
//                             code: 300
//                         })
//                     }
//                 }
//             } else {
//                 res.send({
//                     message: "Invelid code",
//                     error: err,
//                     code: 300
//                 })
//             }
//         }
//     })
// })




account.post("/add-company", (req, res) => {
    User.updateOne({ _id: req.body._id }, { $set: { "companyDetails": req.body.companyDetails } }, (error, success) => {
        if (error) {
            res.send({
                message: "Update fail !",
                error,
                code: 200
            })
        } else {
            res.send({
                message: "Successfuly updated !",
                success
            })
        }
    })
})







account.delete("/deleteUser", (req, res) => {
    User.deleteOne({ _id: req.body._id }, (error, success) => {
        if (error) {
            res.send({
                message: "Delete fail !",
                error
            })
        }
        else {
            res.send({
                message: "Successfuly deleted !",
                success
            })

        }
    })
})


account.get("/get", (req, res) => {
    User.find({}, {}, { sort: { '_id': -1 } }).exec().
        then((users) => {
            res.send({ code: 200, users })
        }).catch((e) => {
            res.send({ e })
        });
});






account.post("/add-commision", (req, res) => {
    User.updateOne({ _id: req.body._id }, { $set: { "commision": req.body.commision } }, (error, success) => {
        if (error) {
            res.send({
                message: "Update fail !",
                error,
                code: 200
            })
        } else {
            res.send({
                message: "Successfuly updated !",
                success
            })
        }
    })
})









account.post("/use-ref-code", (req, res) => {
    User.find({ "my_ref_codes.ref_codes": req.body.ref_codes }, (err, result) => {
        if (err) {
            res.send({
                message: "Somthing wrong",
                error: err,
                code: 300
            })
        } else {
            if (result[0]) {
                console.log(result)
                let codsObj = result[0].my_ref_codes.find((v) => v.ref_codes == req.body.ref_codes)
                if (codsObj._id == req.body._id) {
                    res.send({ code: 300, message: "You can't yous this code" })
                    return
                }
                else {
                    if (codsObj.status == "Active") {
                        User.find({ _id: req.body._id }).exec().then((data) => {
                            if (data[0]) {
                                let codeArr = data[0].used_ref_codes
                                codeArr.push(req.body)
                                User.updateOne({ _id: req.body._id }, { $set: { "used_ref_codes": codeArr } }, (error, success) => {
                                    if (error) {
                                        res.send({
                                            message: "Applied fail !",
                                            error,
                                            code: 300
                                        })
                                    } else {
                                        console.log(codsObj)
                                        res.send({
                                            message: "Code Applied",
                                            code: 200,
                                            coderId: codsObj._id,
                                            my_ref_codes: req.body.ref_codes
                                        });
                                        // User.update({
                                        //     _id: codsObj._id, my_ref_codes: { $elemMatch: { ref_codes: req.body.ref_codes } }
                                        // }, { '$set': { 'my_ref_codes.$.status': 'used' } }, (err, suc) => {
                                        //     if (err) {
                                        //         res.send({
                                        //             message: "Applied fail !",
                                        //             error,
                                        //             code: 300
                                        //         })
                                        //     } else {
                                        //         res.send({
                                        //             message: "Code Applied",
                                        //             success: suc,
                                        //             code: 200
                                        //         })
                                        //     }
                                        // })









                                    }
                                })
                            } else {
                                res.send({
                                    message: "Applied fail !",
                                    code: 300
                                })
                            }
                        })
                    } else {
                        res.send({
                            message: "Already used",
                            code: 300
                        })
                    }
                }
            } else {
                res.send({
                    message: "Invelid code",
                    error: err,
                    code: 300
                })
            }
        }
    })
})


account.post("/suspand", (req, res) => {
    User.updateOne({ _id: req.body._id },
        {
            $set: { "status": req.body.status }
        }, (error, success) => {
            if (error) {
                res.send({
                    message: "Update fail !",
                    error,
                    code: 200
                })
            } else {
                res.send({
                    message: "Successfuly updated !",
                    success
                })
            }
        })
})










account.post('/search', function (req, res, next) {
    let text = req.body.text

    let searchByName;
    let searchPhone;

    if (Number(text) != NaN) {
        searchPhone = text;
        searchByName = ""
    }
    if (isNaN(text)) {
        searchPhone = "";
        searchByName = text
    }
    let regexPhone = '^' + searchPhone;
    let regexUserName = '^' + searchByName;

    let queryOptions = {
        $and: [{
            phone_number: {
                '$regex': regexPhone,
                '$options': 'i'
            }
        },
        {
            username: {
                '$regex': regexUserName,
                '$options': 'i'
            }
        }
        ]
    }

    let promise = User.find(queryOptions);
    promise.then(function (data) {
        if (data) {
            res.send({ code: 200, users: data })
        } else {
            res.send({ code: 200, message: "No data" })
        }
    });
    promise.catch(function (error) {
        return res.status(500).json(error);
    });


});








module.exports = account





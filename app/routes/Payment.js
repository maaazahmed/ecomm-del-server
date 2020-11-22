const express = require("express")
const router = express.Router()
const OrderModel = require("../models/OrderModel")
const User = require("../models/userModel");
const Payment = require("../models/paymentModal");



router.post("/add", (req, res) => {
    User.find({ username: req.body.customerName }).exec().
        then((user) => {
            if (user[0]) {
                OrderModel.find({ order_id:req.body.orderId}).exec().
                    then((order) => {
                        if (order[0]) {
                            const payment = new Payment({
                                customerId:user[0]._id,
                                customerName: req.body.customerName,
                                orderId: req.body.orderId,
                                pay: req.body.pay,
                                discretion: req.body.discretion,
                            });
                            payment.save().then(() => {
                                res.send({
                                    message: "Payment placed",
                                    code: 200
                                });
                            }).catch(() => {
                                res.send({
                                    message: "Failed",
                                    code: 300
                                })
                            })
                        } else {
                            res.send({
                                message: "Order not found",
                                code: 300
                            })
                        }
                    })
            } else {
                res.send({
                    message: "User not found",
                    code: 300
                })
            }
        })
})



router.post("/get-user-pay", (req, res) => {
    Payment.find({ customerId: req.body.customerId }).exec().
        then((data) => {
            res.send({
                data:data,
                code: 200
            })
        }).catch(()=>{
            res.send({
                message: "Something want to wrong!",
                code: 300
            })
        })

})



router.post("/get", (req, res) => {
    Payment.find().exec().
        then((data) => {
            res.send({
                data:data,
                code: 200
            })
        }).catch(()=>{
            res.send({
                message: "Something want to wrong!",
                code: 300
            })
        })

})

module.exports = router
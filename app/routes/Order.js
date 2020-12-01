const express = require("express")
const router = express.Router()
const OrderModel = require("../models/OrderModel")
const User = require("../models/userModel");

router.post("/add", (req, res) => {
    console.log("--")
    OrderModel.find({}).sort({ _id: -1 }).limit(1).then((data) => {
        const { user_info, company_info, orders_info, status, userId, date, total, margin, refers,fcm } = req.body
        const obj = { user_info, company_info, orders_info, status, userId, date, total, margin, fcm }
        let orderID = "ORDER-01"
        if (data[0] && data[0].order_id) {
            let _split = (data[0].order_id).split("-")
            _split = Number(_split[1])
            _split = _split + 1
            if (_split < 10) {
                obj.order_id = "ORDER-0" + _split
            } else {
                obj.order_id = "ORDER-" + _split
            }
        } else {
            obj.order_id = orderID
        }
        const orderModel = new OrderModel(obj)




        orderModel.save().then(({ }) => {
            if (refers == null) {
                res.send({
                    message: "Order Placed!",
                    code: 200,
                })
            } else {



                User.update({
                    _id: refers.coderId, my_ref_codes: { $elemMatch: { ref_codes: refers.my_ref_codes } }
                }, { '$set': { 'my_ref_codes.$.status': 'used' } }, (err, suc) => {
                    if (err) {
                        res.send({
                            message: "Applied fail !",
                            error,
                            code: 300
                        })
                    } else {
                        res.send({
                            message: "Order Placed!",
                            code: 200,

                        })
                    }
                })

            }
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });
    }).catch((err) => {
        console.log(err)
        res.send({
            error: err
        });
    });
});

router.get("/get", (req, res) => {
    const { skip, limit, status } = req.query;
    OrderModel.find({ status: status }, {}, { sort: { '_id': -1 } }).skip(Number(skip)).limit(Number(limit)).exec().
        then((orders) => {
            res.send({ code: 200, orders })
        }).catch((e) => {
            res.send({ e })
        });
});

router.get("/users-order", (req, res) => {
    const { _id, status1, status2 } = req.query;
    console.log(_id)
    OrderModel.find({ userId: _id, $or: [{ status: status1 }, { status: status2 }] }, {}, { sort: { '_id': -1 } }).exec().
        then((orders) => {
            res.send({ code: 200, orders })
        }).catch((e) => {
            res.send({ e })
        });
});



router.get("/users-order-all", (req, res) => {
    const { _id, status } = req.query;
    OrderModel.find({ userId: _id, status }).exec().
        then((orders) => {
            res.send({ code: 200, orders })
        }).catch((e) => {
            res.send({ e })
        });
});


// router.get("/get", (req, res) => {
//     OrderModel.find().exec().
//         then((orders) => {
//             res.send({ code: 200, orders })
//         }).catch((e) => {
//             res.send({ e })
//         });
// });


// router.put("/update-status", (req, res) => {
//     OrderModel.updateOne({ _id: req.body._id }, { $set: { "status": req.body.status } }, (error, success) => {
//         if (error) {
//             res.send({
//                 message: "Update fail !",
//                 error
//             })
//         } else {
//             res.send({
//                 message: "Successfuly updated !",
//                 success
//             })
//         }
//     })
// })



router.put("/update-status", (req, res) => {
    OrderModel.updateOne({ _id: req.body._id }, { $set: { "status": req.body.status } }, (error, success) => {
        if (error) {
            res.send({
                message: "Update fail !",
                error
            })
        } else {
            res.send({
                message: "Successfuly updated !",
                success
            })
        }
    })
})


router.post('/search', function (req, res) {
    var searchByID = req.body.text;
    var regexProName = '^' + searchByID;
    var queryOptions = {
        $and: [{
            order_id: {
                '$regex': regexProName,
                '$options': 'i'
            }
        }
        ]
    }

    var promise = OrderModel.find(queryOptions);
    promise.then(function (data) {
        if (data) {
            res.send({ code: 200, orders: data })
        } else {
            res.send({ code: 200, message: "No data" })
        }
    });
    promise.catch(function (error) {
        res.send(error);
    });
});





router.delete("/delete", (req, res) => {
    OrderModel.deleteOne({ _id: req.query._id }, (error, success) => {
        if (error) {
            res.send({
                message: "delete failed !",
                error,
                code: 300
            })
        }
        else {
            res.send({
                message: "Successfully  !",
                code: 200
            })
        }
    })
})



// router.post("/delete-all", (req, res) => {
//     OrderModel.deleteMany((error, success) => {
//         if (error) {
//             res.send({
//                 message: "delete failed !",
//                 error
//             })
//         }
//         else {
//             res.send({
//                 message: "Successfully updated !",
//                 success,
//                 code: 200
//             })
//         }
//     })
// })


module.exports = router





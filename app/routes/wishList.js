const express = require("express")
const router = express.Router()
const User = require("../models/userModel");



router.post("/add", (req, res) => {
    User.find({ _id: req.body._id }).exec()
        .then((data) => {
            if (data[0]) {
                let wishlist = data[0].wishlist;
                const productId =  req.body.productId;
                if (wishlist) {
                    const X = wishlist.find(x => x.productId === productId)
                    if (X == undefined) {
                        wishlist.push({ productId: productId })
                        User.updateOne({ _id: req.body._id },
                            { $set: { "wishlist": wishlist } }, (error, success) => {
                                res.send({
                                    code: 200,
                                    success
                                })
                            })
                    } else {
                        const X_filter = wishlist.filter(x => x.productId !== productId)
                        User.updateOne({ _id: req.body._id },
                            { $set: { "wishlist": X_filter } }, (error, success) => {
                                res.send({
                                    code: 200,
                                    success
                                })
                            })
                    }
                } else {
                    User.updateOne({ _id: req.body._id },
                        { $set: { "wishlist": [{ productId: productId }] } }, (error, success) => {
                            res.send({
                                code: 200,
                                success
                            })
                        })
                }
            } else {
                res.send({
                    code: 320,
                })
            }
        }).catch(() => {
            res.send({
                code: 300,
            })
        })

})


module.exports = router;
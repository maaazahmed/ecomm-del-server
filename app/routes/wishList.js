const express = require("express")
const router = express.Router()
const User = require("../models/userModel");
const ProductModal = require("../models/ProductModal")




router.post("/add", (req, res) => {
    User.find({ _id: req.body._id }).exec()
        .then((data) => {
            if (data[0]) {
                let wishlist = data[0].wishlist;
                const productId = req.body.productId;
                if (wishlist) {
                    const X = wishlist.find(x => x === productId)
                    if (X == undefined) {
                        wishlist.push(productId)
                        User.updateOne({ _id: req.body._id },
                            { $set: { "wishlist": wishlist } }, (error, success) => {
                                res.send({
                                    code: 200,
                                    message:"Add to fevorite",
                                    success
                                })
                            })
                    } else {
                        const X_filter = wishlist.filter(x => x !== productId)
                        User.updateOne({ _id: req.body._id },
                            { $set: { "wishlist": X_filter } }, (error, success) => {
                                res.send({
                                    code: 200,
                                    message:"Remove from fevorite",
                                    success,
                                    
                                })
                            })
                    }
                } else {
                    User.updateOne({ _id: req.body._id },
                        { $set: { "wishlist": [productId] } }, (error, success) => {
                            res.send({
                                code: 200,
                                message:"Add to fevorite",
                                success
                            })
                        })
                }
            } else {
                res.send({
                    code: 300,
                })
            }
        }).catch(() => {
            res.send({
                code: 300,
            })
        })

})

router.get("/get", (req, res) => {
    ProductModal.find({ _id: { $in:req.body.productIds } }).exec()
        .then((data) => {
            res.send({
                data,
                code:200
            })
        }).catch((err)=>{
            res.send({
                error:err,
                code:300
            })
        })
})


module.exports = router;
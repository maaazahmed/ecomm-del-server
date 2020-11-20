const express = require("express")
const router = express.Router()
const Discount = require("../models/DiscountModal")

router.post("/add", (req, res) => {
    Discount.find().exec().then((data) => {
        console.log(data)
        if (data[0]) {
            Discount.updateOne({ discountVal: req.body.discountVal }).then(({ }) => {
                res.send({
                    message: "value Placed",
                    code: 200
                })
            }).catch((err) => {
                res.status(500).json({
                    error: err
                });
            });
            return;
        }
        const discount = new Discount({
            discountVal: req.body.discountVal,
        })
        discount.save().then(({ }) => {
            res.send({
                message: "value Placed",
                code: 200
            })
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });
    });
});





router.get("/get", (req, res) => {
    Discount.find().exec().then((data) => {
        res.send({
            data,
            code: 200
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        });

    });
});




router.delete("/delete", (req, res) => {
    Discount.deleteOne().then(({ }) => {
        res.send({
            message: "value removed",
            code: 200
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});


module.exports = router
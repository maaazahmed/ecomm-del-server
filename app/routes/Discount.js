const express = require("express")
const router = express.Router()
const Discount = require("../models/DiscountModal")
const ProductModal = require("../models/ProductModal")

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

router.post("/add-by-category", (req, res) => {
    const { suategory, discount } = req.body;
    ProductModal.updateMany({ suategory }, { discount }).exec()
        .then((data) => {
            res.send({ data })
        });
});

// router.post("/get-test", (req, res) => {
//     ProductModal.find({ suategory: "Boys & Girls 2+ Years" }).exec()
//         .then((data) => {
//             res.send({ data })
//         });
// });

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
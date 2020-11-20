const express = require("express")
const router = express.Router()
const BanckDetails = require("../models/banckDetailsModal")


router.post("/add", (req, res) => {
    BanckDetails.find({ _id: req.body._id }).exec().then((data) => {

        // const body = {
        //     _id: req.body._id,
        //     accountNumber: req.body.accountNumber ,
        //     accountHolder: req.body.accountHolder,
        //     bankName: req.body.bankName,
        //     eazyPaisa: req.body.eazyPaisa,
        //     jazzCash: req.body.jazzCash,
        // }

        if (data[0]) {
            BanckDetails.updateOne({ _id: req.body._id }, req.body)
                .then(({ }) => {
                    res.send({
                        message: "value Placed",
                        code: 200
                    })
                }).catch((err) => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    });
                });
        }
        else {
            const banckDetails = new BanckDetails(req.body);
            banckDetails.save()
                .then(({ }) => {
                    res.send({
                        message: "values Placed",
                        code: 200,
                    })
                }).catch((err) => {
                    res.status(500).json({
                        error: err
                    });
                });
        }
    });
});




router.get("/get", (req, res) => {
    console.log(req.query._id)
    BanckDetails.find({ _id: req.query._id }).exec()
        .then(data => {
            res.send({ code: 200, data })
        }).catch(err => {
            res.send({ code: 300, err })
        })
});



module.exports = router
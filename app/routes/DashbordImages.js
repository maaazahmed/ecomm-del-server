const express = require("express")
const router = express.Router()
const DashboardImgsModal = require("../models/dashboardImgsModal")


router.post("/add", (req, res) => {
    const { dashboard_imgs } = req.body;
    const dashboardImgsModal = new DashboardImgsModal({
        dashboard_imgs,
    });
    dashboardImgsModal.save().then(({ }) => {
        res.send({
            message: "Slasenam help video added",
            dashboard_imgs: dashboard_imgs
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});



router.get("/get", (req, res) => {
    DashboardImgsModal.find().exec().
        then((data) => {
            res.send({ code: 200, data })
        }).catch((e) => {
            res.send({ e })
        });
});


router.post("/delete", (req, res) => {
    DashboardImgsModal.deleteOne({ _id: req.body._id }, (err) => {
        if (err) {
            res.send({ err })
        } else {
            res.send({ code: 200, message: "Detel" })

        }
    })


    
    // then((data) => {
    //     res.send({ code: 200, data })
    // }).catch((e) => {
    //     res.send({ e })
    // });
});





module.exports = router





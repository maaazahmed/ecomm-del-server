const express = require("express")
const router = express.Router()
const MarcktingHelpModal = require("../models/MarcktingHelpModal")


router.post("/add", (req, res) => {
    const { marketing_help} = req.body;
    const marcktingHelpModal = new MarcktingHelpModal({
        marketing_help,
    });
    marcktingHelpModal.save().then(({ }) => {
        res.send({
            message: "maecketting help video added"
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});



router.get("/get", (req, res) => {
    MarcktingHelpModal.find().exec().
        then((orders) => {
            res.send({ code: 200, orders })
        }).catch((e) => {
            res.send({ e })
        });
});

module.exports = router





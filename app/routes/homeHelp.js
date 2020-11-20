const express = require("express")
const router = express.Router()
const HomHelpModel = require("../models/HomHelpModel")


router.post("/add", (req, res) => {
    const { home_help } = req.body;
    const homHelpModel = new HomHelpModel({
        home_help,
    });
    homHelpModel.save().then(({ }) => {
        res.send({
            message: "Link Added"
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});



router.get("/get", (req, res) => {
    HomHelpModel.find().exec().
        then((videos) => {
            res.send({ code: 200, videos })
        }).catch((e) => {
            res.send({ e })
        });
});




module.exports = router





const express = require("express")
const router = express.Router()
const SlasemaneHelpModal = require("../models/slasemaneHelpModal")

// slseman_help: salseManeYoutubeLink, title: salseManeTitle, image: data.url
router.post("/add", (req, res) => {
    const { slseman_help, title, image } = req.body;
    const slasemaneHelpModal = new SlasemaneHelpModal({
        slseman_help,
        title,
        image
    });
    slasemaneHelpModal.save().then(({ }) => {
        res.send({
            message: "Slasenam help video added"
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
});


router.get("/get", (req, res) => {
    SlasemaneHelpModal.find().exec().
        then((videos) => {
            res.send({ code: 200, videos })
        }).catch((e) => {
            res.send({ e })
        });
});




router.post("/delete", (req, res) => {
    SlasemaneHelpModal.deleteOne({ _id: req.body._id }, (err) => {
        if (err) {
            res.send({ err })
        } else {
            res.send({ code: 200, message: "Detel" })

        }
    })
})

module.exports = router





const express = require("express")
const router = express.Router()
const CategoryModal = require("../models/CategoryModal")

router.post("/add", (req, res) => {
    const { category_name, category_status, category_image, subcategory_name, subcategory_status, subcategory_image, subcategories } = req.body
    CategoryModal.find({ category_name: req.body.category_name }).exec().
        then((categories) => {
            if (categories.length >= 1) {
                return res.send({
                    message: "Already creaated the category"
                })
            }
            else {
                const categoryModal = new CategoryModal({
                    category_name: category_name,
                    category_status: category_status,
                    category_image: category_image,
                    subcategories: subcategories
                })
                categoryModal.save().then((success) => {
                    res.status(201).json({
                        message: "Category  Created"
                    })
                }).catch((err) => {
                    res.status(500).json({
                        error: err
                    });
                });
            }
        }).catch((e) => {
            res.send({ e })
        });
});



router.get("/get", (req, res) => {
    CategoryModal.find().exec().
        then((categories) => {
            console.log(categories)
            res.send({ code: 200, categories })
        }).catch((e) => {
            res.send({ e })
        });
});




router.put("/update", (req, res) => {
    CategoryModal.updateOne({ _id: req.body._id }, req.body, (error, success) => {
        if (error) {
            res.send({
                message: "Update fail !",
                error
            })
        }
        else {
            res.send({
                message: "Successfuly updated !",
                success
            })
        }
    })
})




router.post("/delete", (req, res) => {
    CategoryModal.deleteOne({ _id: req.body._id }, (error, success) => {
        if (error) {
            res.send({
                message: "delete failed !",
                error
            })
        }
        else {
            res.send({
                message: "Successfully delated !",
                success,
                code: 200
            })
        }
    })
})







router.post('/search', function (req, res, next) {
    var searchByName = req.body.text;
    var regexProName = '^' + searchByName;
    var queryOptions = {
        $and: [
            {
                category_name: {
                    '$regex': regexProName,
                    '$options': 'i'
                }
            }
        ]
    }

    var promise = CategoryModal.find(queryOptions);

    promise.then(function (data) {
        if (data) {
            // return res.status(200).json(data);
            res.send({ code: 200, categories: data })
        } else {
            // return res.status(422).json('No data')
            res.send({ code: 200, message: "No data" })
        }
    });
    promise.catch(function (error) {
        res.send(error);
    });
});



module.exports = router





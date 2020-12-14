const express = require("express")
const router = express.Router()
const ProductModal = require("../models/ProductModal")

router.post("/add", (req, res) => {
    const { product_name, services, cut_price, sale_price, color, size, status, category, suategory, discription, product_imgs, deliveryCharges, showInProductList, cost } = req.body

    ProductModal.find({}).sort({ _id: -1 }).limit(1).then((data) => {
        const obj = {
            product_name: product_name,
            services: services,
            cut_price: cut_price,
            sale_price: sale_price,
            color: color,
            size: size,
            status: status,
            category: category,
            suategory: suategory,
            discription: discription,
            product_imgs: product_imgs,
            deliveryCharges,
            showInProductList,
            cost,
            rating: []
        }

        let orderID = "PRO-01"
        if (data[0] && data[0].product_Id) {
            let _split = (data[0].product_Id).split("-")
            _split = Number(_split[1])
            _split = _split + 1
            if (_split < 10) {
                obj.product_Id = "PRO-0" + _split
            } else {
                obj.product_Id = "PRO-" + _split
            }
        } else {
            obj.product_Id = orderID
        }
        const productModal = new ProductModal(obj)
        productModal.save().then((success) => {
            res.send({
                message: "Product added successfully",
                code: 200
            })
        }).catch((err) => {
            res.status(500).json({
                error: err
            });
        });
    })
});



router.get("/get", (req, res) => {
    const { skip, limit } = req.query;
    ProductModal.find({}, {}, { sort: { '_id': -1 } }).skip(Number(skip)).limit(Number(limit)).exec()
        .then((products) => {
            res.send({ code: 200, products: products })
        }).catch((e) => {
            res.send({ e })
        });
});


// router.get("/get", (req, res) => {
//     const { skip, limit } = req.query;
//     ProductModal.find().skip(Number(skip)).limit(Number(limit)).exec()
//         .then((products) => {
//             res.send({ code: 200, products: products })
//         }).catch((e) => {
//             res.send({ e })
//         });
// });




router.post('/search', function (req, res, next) {
    let text = req.body.text
    var searchById;
    var searchByName;
    if (text[0] == "P" || text[1] == "R" || text[2] == "O") {
        var searchById = req.body.text;
        var searchByName = "";
    } else {
        var searchById = "";
        var searchByName = req.body.text;
    }

    var regexProId = '^' + searchById;
    var regexProName = '^' + searchByName;

    var queryOptions = {

        $and: [{
            product_Id: {
                '$regex': regexProId,
                '$options': 'i'
            }
        }, {
            product_name: {
                '$regex': regexProName,
                '$options': 'i'
            }
        }]
    }










    var promise = ProductModal.find(queryOptions);
    promise.then(function (data) {
        if (data) {
            res.send({ code: 200, products: data })
        } else {
            res.send({ code: 200, message: "No data" })
        }
    });
    promise.catch(function (error) {
        return res.status(500).json(error);
    });


});




router.get("/get-by-subcategory", (req, res) => {
    const { skip, limit, suategory } = req.query;
    ProductModal.find({ suategory: suategory }).skip(Number(skip)).limit(Number(limit)).exec()
        .then((products) => {
            res.send({ code: 200, products: products })
        }).catch((e) => {
            res.send({ e })
        });
});





router.put("/update", (req, res) => {
    ProductModal.updateOne({ _id: req.body._id }, req.body, (error, success) => {
        if (error) {
            res.send({
                message: "Update failed !",
                error
            })
        }
        else {
            res.send({
                message: "Successfully updated !",
                success,
                code: 200
            })
        }
    })
})



router.post("/delete", (req, res) => {
    ProductModal.deleteOne({ _id: req.body._id }, (error, success) => {
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





// router.post('/search-form-app', function (req, res) {
//     var searchBySubcategory = req.body.subcategory;


//     var searchByName = req.body.product_name;


//     var regexProName = '^' + searchByName;
//     var queryOptions = {
//         suategory: searchBySubcategory,
//         $and: [{
//             product_name: {
//                 '$regex': regexProName,
//                 '$options': 'i'
//             }
//         }]
//     }


//     var promise = ProductModal.find(queryOptions);
//     promise.then(function (data) {
//         if (data) {
//             res.send({ code: 200, products: data, })
//         } else {
//             res.send({ code: 200, message: "No data" })
//         }
//     });
//     promise.catch(function (error) {
//         return res.status(500).json(error);
//     });


// });




router.post('/search-form-app', function (req, res) {
    var searchByName = req.body.product_name;
    var queryOptions = {
        // suategory: searchBySubcategory,
        product_name: { "$regex": searchByName, "$options": "i" }
    }

    var promise = ProductModal.find(queryOptions);
    promise.then(function (data) {
        if (data) {
            res.send({ code: 200, products: data, })
        } else {
            res.send({ code: 200, message: "No data" })
        }
    });
    promise.catch(function (error) {
        return res.status(500).json(error);
    });


});




router.post("/rating", (req, res) => {
    let productId = req.body.productId
    delete req.body.productId
    ProductModal.find({ _id: productId }, (e, data) => {
        if (data[0]) {
            const productData = data[0];

            if (productData.rating) {
                ProductModal.update({ _id: productId },
                    { $push: { rating: req.body } }, (error, success) => {
                        if (error) {
                            console.log(error)
                            res.send({
                                message: "failed !",
                                error,
                                code: 300
                            })
                        } else {
                            console.log(productData)
                            res.send({
                                message: "Successfully added !",
                                success,
                                code: 200
                            })
                        }
                    })
            } else {
                ProductModal.updateOne({ _id: productId }, { $set: { rating: [req.body] } }, (error, success) => {
                    if (error) {
                        res.send({
                            message: "failed !",
                            error,
                            code: 300
                        })
                    } else {
                        res.send({
                            message: "Successfully added !",
                            success,
                            code: 200
                        })
                    }
                })
            }
        }

    })
})


module.exports = router





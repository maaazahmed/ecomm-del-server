
var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    product_name: { type: String, required: true },
    services: { type: String, required: false },
    cut_price: { type: String, required: false },
    sale_price: { type: String, required: true },
    color: { type: Object, required: true },
    size: { type: Object, required: true },
    status: { type: String, required: true },
    category: { type: String, required: true },
    suategory: { type: String, required: true },
    discription: { type: String, required: true },
    product_imgs: { type: Object, required: true, },
    product_Id: { type: String, required: true, },
    deliveryCharges: { type: String, required: true, },
    showInProductList: { type: Boolean, required: true, },
    cost: { type: String, required: true, },
    rating: { type: Object, required: false, },
});

module.exports = mongoose.model("products", productSchema);
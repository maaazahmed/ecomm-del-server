
var mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    category_name: { type: String, required: true },
    category_status: { type: String, required: true, },
    category_image: { type: String, required: true, },
    subcategories: { type: Object, required: true }
    // 
    // subcategory_name: { type: String, required: true },
    // subcategory_status: { type: String, required: true, },
    // subcategory_image: { type: String, required: true, },
})


module.exports = mongoose.model("categories", userSchema)
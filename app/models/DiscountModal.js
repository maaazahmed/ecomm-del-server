
var mongoose = require("mongoose");

const discountSchema = mongoose.Schema({
    discountVal: { type: String, required: true },
})


module.exports = mongoose.model("Discount", discountSchema)
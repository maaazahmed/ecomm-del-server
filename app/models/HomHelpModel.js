
var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    home_help: { type: Object, required: true },
})

module.exports = mongoose.model("home_help", productSchema); 
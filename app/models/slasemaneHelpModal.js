
var mongoose = require("mongoose");

const helpSchema = mongoose.Schema({
    slseman_help: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true }
})

module.exports = mongoose.model("salsemane_help", helpSchema); 
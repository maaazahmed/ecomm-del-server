
var mongoose = require("mongoose");

const helpSchema = mongoose.Schema({
    marketing_help: { type: String, required: true },
})

module.exports = mongoose.model("marcketing_help", helpSchema); 
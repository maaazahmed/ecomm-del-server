
var mongoose = require("mongoose");

const dashboardImgSchema = mongoose.Schema({
    dashboard_imgs: { type: String, required: true },
})

module.exports = mongoose.model("dashboard_imges", dashboardImgSchema); 
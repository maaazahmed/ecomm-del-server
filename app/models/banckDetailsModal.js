
var mongoose = require("mongoose");

const banckSchema = mongoose.Schema({
    _id: { type: String, required: false },
    accountNumber: { type: String, required: false },
    accountHolder: { type: String, required: false },
    bankName: { type: String, required: false },
    eazyPaisa: { type: String, required: false },
    jazzCash: { type: String, required: false },
});

module.exports = mongoose.model("BanckDetail", banckSchema)
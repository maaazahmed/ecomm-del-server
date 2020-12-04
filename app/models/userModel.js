
var mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    phone_number: { type: String, required: true },
    acount_type: { type: String, required: true },
    password: { type: String, required: true },
    workNEducetion: { type: Object, required: true },
    companyDetails: { type: Object, required: true },
    my_ref_codes: { type: Object, required: true },
    used_ref_codes: { type: Object, required: true },
    commision: { type: String, required: true },
    fbId: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: Boolean, required: true },
    wishlist:{ type: Object, required: true }

})
module.exports = mongoose.model("Users", userSchema)
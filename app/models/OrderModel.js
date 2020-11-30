
var mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user_info: { type: Object, required: true },
    company_info: { type: Object, required: true, },
    orders_info: { type: Object, required: true, },
    status: { type: String, required: true, },
    order_id: { type: String, required: true, },
    userId: { type: String, required: true, },
    date: { type: String, required: true, },
    total: { type: String, required: true, },
    margin: { type: String, required: true, },
    fcm:{ type: String, required: true },

});

module.exports = mongoose.model("orders", orderSchema)
var mongoose = require("mongoose");

const payment = mongoose.Schema({
    customerId:{ type: String, required: true },
    customerName:{ type: String, required: true },
    orderId:{ type: String, required: true },
    pay:{ type: String, required: true },
    discretion:{ type: String, required: true },
});

module.exports = mongoose.model("Payment", payment)
var express = require("express")
var bodyParser = require("body-parser")
var cors = require("cors");
var app = express()
var mongoose = require("mongoose")

mongoose.set('useCreateIndex', true);
mongoose.connect("mongodb+srv://maaazahmed:maaz1234@cluster0.mftpp.mongodb.net/apptesting?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const account = require("./app/routes/accounts")
const adminAccount = require("./app/routes/adminAuth")
const adminCreatedUse = require("./app/routes/adminCreatedUse")
const category = require("./app/routes/category")
const product = require("./app/routes/Product")
const order = require("./app/routes/Order")
const homeHelp = require("./app/routes/homeHelp")
const slasemanHelp = require("./app/routes/SlasenameHelp")
const marcketingHelp = require("./app/routes/marketingHelp")
const DashbordImages = require("./app/routes/DashbordImages")
const upload = require("./app/routes/Upload")
const discount = require("./app/routes/Discount")
const banckDetails = require("./app/routes/banckDetails")
const facebookAuth = require("./app/routes/facebookAuth")
const payment = require("./app/routes/Payment")
const notification = require("./app/routes/Notification")
const wishList = require("./app/routes/wishList")
// ===============================================
// ===============================================
// ===============================================
app.use(cors())
app.set("port", process.env.PORT || 8000)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "5000kb" }))

app.use("/account", account);
app.use("/adminauth", adminAccount);
app.use("/admincreateduser", adminCreatedUse);
app.use("/category", category);
app.use("/product", product);
app.use("/order", order);
app.use("/home", homeHelp);
app.use("/slaseman-help", slasemanHelp);
app.use("/marketing-help", marcketingHelp);
app.use("/dashbordImages", DashbordImages);
app.use("/images", upload);
app.use("/discount", discount);
app.use("/banck-details", banckDetails);
app.use("/facebookauth", facebookAuth);
app.use("/payment", payment);
app.use("/firebase", notification);
app.use("/wishList", wishList);


app.listen(app.get("port"), () => console.log("Server is running on port 8000"))

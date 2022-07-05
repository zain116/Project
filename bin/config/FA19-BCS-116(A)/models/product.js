var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
    task: String,
    date: Date,
    status: String,
});
const Product = mongoose.model("Product",productSchema)
module.exports = Product;
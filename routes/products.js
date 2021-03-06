var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var checkSessionAuth = require("../middleware/checkSessionAuth");
const sessionAuth = require("../middleware/sessionAuth");

/* GET home page. */
router.get("/", async function(req, res, next) {
  console.log("req.session.user");
  let products = await Product.find();
  res.render("products/list",{title: "Tasks", products});
});

router.get("/add", checkSessionAuth, sessionAuth, async function(req, res, next) {
  res.render("products/add");
});

router.post("/add", checkSessionAuth, sessionAuth, async function(req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.redirect("/products");
  console.log(req.body);
});

router.get("/delete/:id",checkSessionAuth,sessionAuth, async function(req,res, next) {
 let product = await Product.findByIdAndDelete(req.params.id);
 res.redirect("/products");
});

 

  
router.get("/edit/:id",checkSessionAuth,sessionAuth,async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  res.render("products/edit", { product });
})

router.post("/edit/:id", async function(req,res, next) {
  let product = await Product.findById(req.params.id);
  product.task = req.body.task;
  product.date = req.body.date;
  product.status = req.body.status;
  await product.save();
  res.redirect("/products");
 });


module.exports = router;



// router.get("/cart/:id", async function(req,res, next) {
//   console.log("addded to cart");
//   let product = await Product.findById(req.params.id);
//   let cart = [];
//   if(req.cookies.cart) cart = req.cookies.cart;
//   cart.push(product);
//   res.cookie("cart",cart);
//   res.redirect("/products");
//   });
  
//   router.get("/cart/remove/:id", async function(req,res, next) {
//     let cart = [];
//     if(req.cookies.cart) cart = req.cookies.cart;
//     cart.splice(
//       cart.findIndex((c) => c._id == req.params.id),
//       1
//     );
//     res.cookie("cart",cart);
//     console.log("going to cart");
//     res.redirect("/cart");
//     });
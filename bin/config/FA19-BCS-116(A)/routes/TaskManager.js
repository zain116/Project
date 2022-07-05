var express = require("express");
var router = express.Router();
var TaskManager = require("../models/task");
var checkSessionAuth = require("../middleware/checkSessionAuth");
const sessionAuth = require("../middleware/sessionAuth");

/* GET home page. */
router.get("/", async function(req, res, next) {
  console.log("req.session.user");
  let TaskManager = await Task.find();
  res.render("Task/list",{title: "Tasks", Task});
});

router.get("/add",async function(req, res, next) {
  res.render("Task/add");
});

router.post("/add",  async function(req, res, next) {
  let Task = new Task(req.body);
  await Task.save();
  res.redirect("/Task");
  console.log(req.body);
});

router.get("/delete/:id", async function(req,res, next) {
 let Task= await Task.findByIdAndDelete(req.params.id);
 res.redirect("/Task");
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
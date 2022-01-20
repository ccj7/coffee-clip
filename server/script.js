const mongoose = require("mongoose");
const shopData = require("./shopData");

mongoose.connect("mongodb://localhost:3000/shopdata", () => {
  console.log("conected");
});

new shopData();

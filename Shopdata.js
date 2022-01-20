const mongoose = require("mongoose");

const shopdataSchema = new mongoose.Schema({
  shopId: String,
  name: String,
  image: String,
  comment: String,
});

module.exports = mongoose.model("shopData", shopdataSchema);

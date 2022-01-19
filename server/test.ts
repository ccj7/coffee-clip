const mongoose = require("mongoose");

async function main() {
  console.log("start");

  await mongoose.connect("mongodb://localhost:27017/test");

  console.log("connect");
}

async function test() {
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  const Kitten = mongoose.model("Kitten", kittySchema);

  const mike = new Kitten({ name: "Mike" });
  await mike.save();

  const bob = new Kitten({ name: "Bob" });
  await bob.save();

  const kittens = await Kitten.find();
  console.log(kittens);

  console.log("finish");
  // TODO:　クローズの仕方
}

main().catch((err) => console.log(err));
test().catch((err) => console.log(err));

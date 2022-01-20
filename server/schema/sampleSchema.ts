import { Schema }  from "mongoose";

interface Kitty {
  name: string;
  hidden: boolean;
  age?: number;
}

const kittySchema = new Schema<Kitty>(
  {
    name: {type: String, required: true },
    hidden: {type: Boolean, required: true },
    age: Number
  }
)

export default kittySchema;
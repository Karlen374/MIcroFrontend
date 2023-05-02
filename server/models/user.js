import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  moneys: {type: Object},
  moneysOperations: {type: Object}
})

export default mongoose.model('User',User)
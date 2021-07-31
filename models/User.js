const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  // id auto generated
  name: String,
  email: String,
  picture: String
})

module.exports = mongoose.model("User", UserSchema)
const user = {
  _id: "1",
  name: "Reed",
  email: "reedbarger@yahoo.com",
  picture: "https://cloudinary.com/sdf"
}

module.exports = {

    Query:{
      me: () => user
    }
  }
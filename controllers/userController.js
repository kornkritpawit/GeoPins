const User = require('../models/User')
const {OAuth2Client} = require('google-auth-library')

// require('dotenv').config()
console.log(process.env.OAUTH_CLIENT_ID)
 
const client = new OAuth2Client(
  // process.env.OAUTH_CLIENT_ID
  )

exports.findOrCreateUser = async token => {
  //verify auth token
  const googleUser = await verifyAuthToken(token)
  //check if the user exists
  const user = await checkIfUserExists(googleUser.email)
  // console.log(user)

  // if user exists, return them; otherwise, create new users in db
  return user ? user : createNewUser(googleUser)
}

const verifyAuthToken = async token => {
  try{
    const ticket = await client.verifyIdToken({
      idToken: token,
      // audience: process.env.OAUTH_CLIENT_ID
    })
    // console.log(ticket.getPayload())
    return ticket.getPayload() //return google user like on success in react Login
  } catch(err){
    console.error("Error verifying auth token", err)
  }
}

const checkIfUserExists = async email => 
await User.findOne({email}).exec()

const createNewUser = googleUser =>{
  const { name, email, picture } = googleUser
  const user = { name, email, picture }
  return new User(user).save()
}


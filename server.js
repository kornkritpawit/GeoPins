require('dotenv').config()

const {ApolloServer} = require('apollo-server')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
const { findOrCreateUser } = require('./controllers/userController')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(()=> console.log('DB connected!'))
  .catch(err=>console.err(err))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req})=>{
    let authToken = null
    let currentUser = null
    try {
      authToken = req.headers.authorization
      if(authToken) {
        // find or create user
        currentUser = await findOrCreateUser(authToken)
        // console.log(currentUser)
      }
    } catch (err) {
      console.error(`Unable to authenticate user with token ${authToken}`)
    }
    return {currentUser}
  }
})


server.listen().then(({url}) =>{console.log(`Server listening on ${url}`)});
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const { findOrCreateUser } = require('./controllers/userController')

const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("db connected"))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:  async ({ req }) => {
    let authToken = null
    let currentUser = null
    try {
      authToken = req.headers.authorization
      if(authToken) {
        // find or create user 
        currentUser = await findOrCreateUser(authToken)
      }
    } catch (err) {
      console.error('unable to authenticate user with ')
    }
    return { currentUser }
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`);
});

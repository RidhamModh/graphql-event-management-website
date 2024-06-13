const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

console.log(process.env.MONGO_USER)
mongoose
  .connect(
    "mongodb+srv://testuser:Jay1998@cluster0.c1w9rbn.mongodb.net/events-react-dev?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(8000);
    console.log("Successfully Connected")
  })
  .catch(err => {
    console.log(err);
  });

//   function database() {
//     const connectionParams = {
//         useNewUrlParser : true,
//         useUnifiedTopology : true
//     }
//     try{
//         mongoose.connect(process.env.MONGO_URI, connectionParams);
//         console.log('Database connected successfully');
//     } catch(error){
//         console.log(error);
//         console.log("Database connection failed");
//     }
// }
// database();


  // mongodb+srv://testuser:Jay1998@cluster0.c1w9rbn.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require("./graphql/resolvers/index");

dotenv.config();
const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(3000, () => {
      console.log("server start on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

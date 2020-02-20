const mongoose = require("mongoose");
const keys = require("../config/keys");

require("./models/User");
require("./models/List");

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch(err => console.log("Error cannot connect to mongoDB: " + err));



const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true
  },
  err => {
    if (err) {
      console.error.bind("Connection failed");
    } else {
      console.log("[MongoDB]: Connection successful");
    }
  }
);

module.exports = mongoose;

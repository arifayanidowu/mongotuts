const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  err => {
    if (err) {
      console.log(`[MONGODB]: Connection failed`);
    } else {
      console.log(`[MONGODB]: Connection successful`);
    }
  }
);

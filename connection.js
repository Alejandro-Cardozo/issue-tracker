const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", _ => {
  console.log("Database is connected");
});

mongoose.connection.on("error", err => {
  console.log(err);
});
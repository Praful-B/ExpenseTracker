const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
  } catch (err) {
    console.log("An error occured when connecting to mongoDB", err);
  }
}
connectDB().catch((err) => console.log(err));

export default connectDB;

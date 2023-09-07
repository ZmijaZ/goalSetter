const mongoose = require("mongoose");
const User = require("./backend/models/userModel");

require("dotenv").config();

const deleteUsers = async () => {
  await User.deleteMany({}).exec();

  const users = await User.find({}).exec();
  if (users.length === 0) {
    console.log("Successfully deleted users");
    console.log("You may continue...");
  }
};

const mongoDb = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoDb, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

connectDB();
deleteUsers();

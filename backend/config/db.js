const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`mongo connected ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error ${err}`);
    process.exit();
  }
};

module.exports = connectDB;

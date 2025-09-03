import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Support both MONGO_URI and MONGODB_URI environment variable names
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error(
        "MongoDB URI is not defined. Please set MONGO_URI or MONGODB_URI environment variable."
      );
    }

    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;

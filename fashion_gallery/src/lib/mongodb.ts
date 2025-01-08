import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
     mongoose.connect(MONGODB_URI!, {
      dbName: "mydb",
      bufferCommands: true,
      
    });
    console.log("Connected");
  } catch (err) {
    console.log("Error: ", err);
    if (err instanceof Error) {
      throw new Error("Error: " + err.message);
    } else {
      throw new Error("Unknown error occurred during MongoDB connection");
    }
  }
};

export default connect;
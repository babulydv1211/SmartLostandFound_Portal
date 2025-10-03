import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI

export async function connectToDatabase() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined")
  }

  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully")
  })

  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", error)
  })

  return mongoose.connect(MONGO_URI)
}

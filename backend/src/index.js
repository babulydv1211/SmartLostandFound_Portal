import "./loadEnv.js"
import app from "./server.js"
import { connectToDatabase } from "./lib/mongo.js"

const PORT = process.env.PORT ?? 4000

import dotenv from "dotenv";
dotenv.config();
console.log("ADMIN_ID:", process.env.ADMIN_ID);


async function bootstrap() {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Smart Lost & Found backend running on port ${PORT}`)
  })
}

bootstrap().catch((error) => {
  console.error("Failed to start application:", error)
  process.exit(1)
})

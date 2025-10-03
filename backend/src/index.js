import "./loadEnv.js"
import app from "./server.js"
import { connectToDatabase } from "./lib/mongo.js"

const PORT = process.env.PORT ?? 4000

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

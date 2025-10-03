// import express from "express"
// import cors from "cors"
// import morgan from "morgan"
// import authRouter from "./routes/auth.js"
// import itemsRouter from "./routes/items.js"
// import commentsRouter from "./routes/comments.js"
// import matchRouter from "./routes/match.js"

// const app = express()

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL?.split(",") ?? ["http://localhost:5173"],
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// )
// app.use(express.json({ limit: "10mb" }))
// app.use(express.urlencoded({ extended: true }))
// app.use(morgan("dev"))

// app.get("/health", (_req, res) => res.json({ status: "ok" }))

// app.use("/auth", authRouter)
// app.use("/", itemsRouter)
// app.use("/", commentsRouter)
// app.use("/", matchRouter)

// app.use((err, _req, res, _next) => {
//   console.error(err)
//   res.status(err.status ?? 500).json({
//     message: err.message ?? "Internal server error",
//   })
// })

// export default app



import express from "express"
import cors from "cors"
import morgan from "morgan"
import authRouter from "./routes/auth.js"
import itemsRouter from "./routes/items.js"
import commentsRouter from "./routes/comments.js"
import matchRouter from "./routes/match.js"

const app = express()

// CORS middleware for dev frontend
const allowedOrigins = process.env.FRONTEND_URL?.split(",") ?? ["http://localhost:5173"]

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // allow cookies if needed
}))

// Handle preflight requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))

// Middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }))

// Namespaced routers
app.use("/auth", authRouter)
app.use("/", itemsRouter) //here some change
app.use("/comments", commentsRouter)
app.use("/match", matchRouter)

// Error handling
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status ?? 500).json({
    message: err.message ?? "Internal server error",
  })
})

export default app

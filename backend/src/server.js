
import express from "express"
import cors from "cors"
import morgan from "morgan"
import authRouter from "./routes/auth.js"
import itemsRouter from "./routes/items.js"
import commentsRouter from "./routes/comments.js"
import matchRouter from "./routes/match.js"
import adminRouter from "./routes/admin.js"

import dotenv from "dotenv";
dotenv.config();


const app = express()

// Define allowed origins
const allowedOrigins = [
  "https://smartlostandfoundportal.onrender.com",  // Main frontend
  "https://smartlostandfoundportal-admin.onrender.com",  // Admin frontend
]

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Access-Control-Allow-Origin']
}

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Regular middleware
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

// Health check
app.get("/health", (_req, res) => res.json({ status: "ok" }))

// Routes
app.use("/auth", authRouter)
app.use("/", itemsRouter)
app.use("/comments", commentsRouter)
app.use("/match", matchRouter)
app.use("/api", adminRouter)

// Error handling
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(err.status ?? 500).json({
    message: err.message ?? "Internal server error",
  })
})

export default app

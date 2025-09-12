import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://aegisexpresslog.vercel.app",
      "https://www.aegisexpresslog.com",
      "https://express-logistics-client.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

const publicLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});

app.use("/api", publicLimiter);

// Handle preflight OPTIONS requests
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, Origin, X-Requested-With"
  );
  res.sendStatus(200);
});

app.use("/api/auth", authRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/invoices", invoiceRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    mongoUri: mongoUri ? "✅ Set" : "❌ Missing",
    redisUrl: process.env.REDIS_URL ? "✅ Set" : "❌ Missing",
    emailUser: process.env.EMAIL_USER ? "✅ Set" : "❌ Missing",
  });
});

// (Optional) serve client build from ../client/dist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);

app.use(notFound);
app.use(errorHandler);

export default app;

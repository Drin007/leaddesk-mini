const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});
app.use("/api/auth/login", loginLimiter);

app.get("/", (req, res) => {
  res.send("LeadDesk API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

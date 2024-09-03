import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import producRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import bodyParser from "body-parser";
const port = process.env.PORT || 8000;

connectDB(); // connect to MongoDB

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));
app.set("trust proxy", 1);

app.use(cookieParser());

app.use(bodyParser.json());

app.use("/api/products", producRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

console.info("server", process.env.NODE_ENV);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.info(`server listening on port ${port}`));

export default app;

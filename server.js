import express from "express";
import * as dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";
import colors from "colors";
import connectDB from "./config/db.js";
import ticketRoutes from "./routes/ticketRoutes.js";

const app = express();

dotenv.config();

connectDB();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

// app.get("/", (req, res) => {
//   res.send("Hello from the server!");
// });

app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

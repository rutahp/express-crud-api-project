import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api", userRoute);
app.use("/api/auth", authRoute);

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler)

// Create user table if it doesn't exist
createUserTable();

//testing the database connection
app.get("/", async (req, res) => {
    console.log("start");
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`Connected to database: ${result.rows[0].current_database}`);
});

// SERVER RUNNING
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import express from 'express';
import { connectDB } from './db/connectDB.js';
import dotenv from 'dotenv';
import booksRoute from "./routes/book.js"

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/books",booksRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})
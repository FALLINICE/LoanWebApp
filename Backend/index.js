const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB = require('./connection/index');
const router = require("./routes/index");
const cookieParser = require('cookie-parser');
const Admin = require('./models/admin'); // Ensure this is the correct path to your Admin model
dotenv.config();

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router); // Ensure this comes after CORS setup

// Start the server and establish DB connection
app.listen(PORT, async () => {
    console.log(`Server has started on port ${PORT}`);

    try {
        // Ensure DB is connected first
        await connectDB();
        console.log("Database connected successfully!");


    } catch (error) {
        console.error("Error creating admin: ", error);
    }
});

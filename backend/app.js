const dotenv = require('dotenv');
dotenv.config();


const mongoose = require('mongoose');
const connectDB = require('./config/db');
connectDB();

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
    res.send('E-voting system backend is running!');
});


const authRoutes = require('./routes/authRoutes');
const voteRoutes = require('./routes/voteRoutes');
const adminRoutes = require('./routes/adminRoutes');


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

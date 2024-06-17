const express = require('express');
const mongoose = require('mongoose');
const profileRoutes = require('./routes/profileRoute');
const errorHandler = require('./middlewares/errorHandler');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
// Routes
app.use('/api', profileRoutes);

// Error Handling Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Connection error', error);
});

app.listen(port, () => {
    console.log("Server is running....")
    console.log(`Server running on port ${port}`);
    //  console.log(__dirname);

});



const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
app.use(cors());

const connectDB = require('./config/db');
connectDB();

app.use(express.json());
app.use('/api/rover', require('./router/roverRoutes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
}
);
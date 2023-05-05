import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'
import { dbConnect } from './db/dbconnect.js';
dbConnect();

const app = express()
const PORT = 5000
app.use(cors({ origin: 'http://localhost:3000', }))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './routes/entry.js'
import userRoutes from './routes/user.js'
app.use('/', authRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}`);
});
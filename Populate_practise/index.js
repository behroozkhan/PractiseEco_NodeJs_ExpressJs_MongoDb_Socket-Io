// Import Module And Folder file Path
import express from 'express';
import cors from 'cors'
import router from './routes/index.js';
import PRODUCTS from './constants/index.js';
import 'dotenv/config';


const app = express()
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use('/api',router)


// Just For checking
app.get("/", (req, res) => {
    res.status(200).send({products: PRODUCTS})
})


// Port Listieng This Code
app.listen(PORT, () => {
    console.log(`port is running ${PORT}`);
})
// Import Module And Folder file Path
import express from 'express';
import mongoose from './dbConfig/index.js';
import cors from 'cors'
import UserSch from './models/index.js';
import router from './routes/index.js';
import PRODUCTS from './constants/index.js';
import 'dotenv/config';

// Important Things 
const app = express()
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use('/api',router)

// Middleware Checking User Authentication
// app.use('/',(req,res,next)=>{
//     console.log("aagai Request==>",req.query);
//     if(req?.query?.apiKey === '123'){
//         console.log("aagai Request==>",req.query.apiKey);
//         next();
//     }else{
//         res.status(401).send({message: "User Not Authenticated"})
//     }
// })

// Connecting with mongoDb 
const db = mongoose.connection;
db.on("console", console.error.bind(console, "Connection Error"))
db.once("open", function () {
    console.log("db Connected");
})


// Just For checking
app.get("/", (req, res) => {
    res.status(200).send({products: PRODUCTS})
})


// User Place The Order In frontend this function Working ON Backend
app.post("/order", async (req, res) => {
    try {
        console.log("Order PLaced Succesfully", req.body);
        console.log("User Info:", req.body.userInfo);
        console.log("Order Cart:", req.body.cart);
        const message = "Order PLaced";
        const { userInfo} = req.body;
        const userData = new UserSch(userInfo)
        await userData.save()
        res.status(200).send(message);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
})







// Port Listieng This Code
app.listen(PORT, () => {
    console.log(`port is running ${PORT}`);
})
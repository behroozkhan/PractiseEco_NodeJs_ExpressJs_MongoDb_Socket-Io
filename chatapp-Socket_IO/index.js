// Import Module And Folder file Path
import express from 'express';
import cors from 'cors'
import router from './routes/index.js';
import PRODUCTS from './constants/index.js';
import 'dotenv/config';
import {createServer} from 'http'
import { Server } from 'socket.io';
// import { Socket } from 'dgram';

const app = express()
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use('/api',router)

// Just For checking
app.get("/", (req, res) => {
    res.status(200).send({products: PRODUCTS})
})

// socket io connection
const httpServer = createServer(app);
const io = new Server(httpServer,{cors:'*'})
io.on('connection',(socket) =>{
    console.log("made Socket Connection",socket.id);
    socket.on('add-todo',(data)=>{
        console.log("values coming to frontend",data);
        io.emit('send-todo',data)
    })
})


// Port Listieng This Code
httpServer.listen(PORT, () => {
    console.log(`port is running ${PORT}`);
})

// app.listen(PORT,()=>{
//     console.log(`port running on surver ${PORT}`);
// })
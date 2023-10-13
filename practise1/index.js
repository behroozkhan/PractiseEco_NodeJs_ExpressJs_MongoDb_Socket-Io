import express from 'express';
import mongoose from './mongo config/index.js';
import 'dotenv/config';


const app = express()
const PORT = process.env.PORT || 8000;
app.use(express.json);
// app.use(cors); 

// const dataObj = [{
//     id: 2,
//     name: "behrooz khan",
//     fatherName: "Sikander khan",
//     batch: "9",
//     Section: "H",
// },
// {
//     id: 2,
//     name: "behrooz khan",
//     fatherName: "Sikander khan",
//     batch: "9",
//     Section: "H",
// }
// ];


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
    console.log("db Connected");
})

app.post('/order', (req, res) => {
    console.log("order PLaced Succefully", req.body);
    res.send({ message: "order Placed" })

})


// app.get('/', (req, res) => {
//     res.send(dataObj);
// })


app.listen(PORT, () => {
    console.log(`port is running ${PORT}`);
})

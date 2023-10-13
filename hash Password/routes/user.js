import express from "express"
import mongoose from '../dbConfig/index.js';
import UserSch from '../models/index.js';
import bcrypt from 'bcrypt'


const router = express.Router();

// Connecting with mongoDb 
const db = mongoose.connection;
db.on("console", console.error.bind(console, "Connection Error"))
db.once("open", function () {
    console.log("db Connected");
})

const users = [{
    id: 1,
    name: "behrooz khan",
    phone: 3228266466,
    age: 20,
    gender: 'Male',
    batch: "9",

}, {
    id: 2,
    name: "Arman khan",
    phone: 3228266466,
    age: 14,
    gender: 'Male',
    Inter: "11",
}
    , {
    id: 3,
    name: "Hasnian khan",
    phone: 3228266466,
    age: 20,
    gender: 'Male',
    language: "5 to 6",
}


]

router.get('/', (req, res) => {
    res.status(200).send({ users: users });
})
// User Register Logic
router.post('/', async (req, res) => {
    try {
        const { password, ...userData } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserSch({ ...userData, password: hashedPassword });
        const savedUser = await newUser.save();
        return res.status(200).send({ status: 200, message: "success", user: savedUser });
    } catch (error) {
        return res.status(400).send({ status: 400, message: error.message });
    }
})

// User Login Logic
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const userFind = await UserSch.findOne({ email, })
        console.log("userFind==>", userFind.email);
        if (!userFind) {
            return res.status(401).send({ status: 400, message: "User Not Found" });
        }
        const compareHasPas = bcrypt.compareSync(password, userFind.password);
        if (!compareHasPas) {
            return res.status(403).send({ status: 403, message: "PassWord Incorrect / Password Did Not Match" });
        }
        console.log("compareHasPas==>", compareHasPas);
        // delete userFind.password
        const userComeWithoutPass = { ...userFind.toObject(), password: undefined }
        return res.status(200).send({ status: 200, userComeWithoutPass, message: "success" });
    } catch (error) {
        return res.status(400).send({ status: 400, message: error.message });
    }
})


export default router;
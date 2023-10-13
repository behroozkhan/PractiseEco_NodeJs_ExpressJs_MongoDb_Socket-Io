import express from "express"
import mongoose from '../dbConfig/index.js';
import UserSch from '../models/index.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import JoiValidSchema from "../Schemas/index.js";
import chalk from "chalk";
import verifyToken from "../middleware/verifyToken.js";
import 'dotenv/config';
const router = express.Router();

// Connecting with mongoDb 
const db = mongoose.connection;
db.on("console", console.error.bind(chalk.bgRed(console, "Connection Error")))
db.once("open", function () {
    console.log(chalk.bgGreen(" db Connected! "));
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

// router.get('/', (req, res) => {
//     res.status(200).send({ users: users });
// })



// User Register Logic
router.post('/' , async (req, res) => {
    try {
        const validateUserFeilds = await JoiValidSchema.validateAsync(req.body);
        const { password, ...userData } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserSch({ ...userData, password: hashedPassword });
        const savedUser = await newUser.save();
        const token = jwt.sign({ _id: savedUser._id, email: savedUser.email, username: savedUser.name }, process.env.JWT_SECRET);
        return res.status(200).send({ status: 200, message: chalk.bgGreen("success"), user: savedUser, token });
    } catch (error) {
        return res.status(400).send({ status: 400, message: chalk.bgRed(error.message) });
    }
})

// User Login Logic
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const userFind = await UserSch.findOne({ email })
        console.log(chalk.bgGreen("userFind==>", userFind.email));
        if (!userFind) {
            return res.status(401).send({ status: 400, message: chalk.bgRed("User Not Found") });
        }
        const compareHasPas = bcrypt.compareSync(password, userFind.password);
        if (!compareHasPas) {
            return res.status(403).send({ status: 403, message: chalk.bgGreen("PassWord Incorrect / Password Did Not Match") });
        }
        console.log("compareHasPas==>", compareHasPas);
        // delete userFind.password
        const userComeWithoutPass = { ...userFind.toObject(), password: undefined }
        const token = jwt.sign({ _id: userFind._id, email: userFind.email }, process.env.JWT_SECRET)
        return res.status(200).send({ status: 200, userComeWithoutPass, token, message: chalk.bgGreen("Login Succesfully") });
    } catch (error) {
        return res.status(400).send({ status: 400, message: chalk.bgRed(error.message) });
    }
})


// User Retrieval Logic
router.get("/", verifyToken, async (req, res) => {
    try {
        const users = await UserSch.find();
        return res.status(200).send({ status: 200, users: users });
    } catch (error) {
        return res.status(500).send({ status: 500, message: chalk.bgRed("Server Error"), });
    }
});

export default router;
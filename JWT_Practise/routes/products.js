import express from "express"
import PRODUCTS from "../constants/index.js";
const router = express.Router();


router.get('/',(req,res)=>{
    res.status(200).send({products:PRODUCTS})
})

export default router
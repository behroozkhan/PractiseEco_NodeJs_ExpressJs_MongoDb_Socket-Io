import express from "express"
import user from "./user.js"
import products from './products.js'
import upload from './upload.js'
import conversation from './conversation.js'


const router = express.Router();

router.use("/user", user)
router.use("/products", products)
router.use("/upload", upload)
router.use("/conversation", conversation)



export default router;
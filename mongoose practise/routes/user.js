import express from "express"

const router = express.Router();

const users = [{
    id:1,
    name:"behrooz khan",
    age:20,
    gender:'Male',
    batch:"9",
    
},{
    id:2,
    name:"Arman khan",
    age:14,
    gender:'Male',
    Inter:"11",
}
,{
    id:3,
    name:"Hasnian khan",
    age:20,
    gender:'Male',
    language:"5 to 6",
}


]

router.get('/',(req,res)=>{
    res.status(200).send({users:users})
})

export default router
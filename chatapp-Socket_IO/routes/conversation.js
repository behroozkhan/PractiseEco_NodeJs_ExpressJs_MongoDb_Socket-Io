import chalk from "chalk";
import ConversationSch from "../models/conversation.js";
import UserSch from '../models/index.js';
import Messages from "../models/messages.js";
import express from 'express';

const router = express.Router();

// conversation logic 
router.post('/conversations', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        console.log(req.body);
        console.log("senderId", req.body.senderId, "===>", "receiverId", req.body.receiverId);
        const newConversation = new ConversationSch({ chatMembers: [senderId, receiverId] });
        await newConversation.save();
        return res.status(200).send({ status: 200, newConversation, message: chalk.bgGreen(" Conversation Succefully") });
    } catch (error) {
        return res.status(400).send({ status: 400, error: chalk.bgRed(error.message) });
    }
});



// router.get('/conversation/:id', async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const conversation = await ConversationSch.find({ members: { $in: [userId] } })
//         const currentUserInfo = Promise.all(conversation.map(async(conversation)=>{
//             const receverId = conversation.members.find((member) => member !== userId);
//             const user = await UserSch.findById(receverId);
//             return {user : {email : user.email , name : user.name ,  }, conversationId : conversation._id}
//         }))
//         // const conversationId = conversation.map(conv => conv._id);
//         // console.log("conversationId", conversationId);
//         return res.status(200).send(await currentUserInfo);
//     } catch (error) {
//         return res.status(400).send({ status: 400, message: (error.message) });

//     }
// })




// Message logic



router.post('/messages', async (req, res) => {
    try {
        const { conversationId, senderId, message } = req.body;
        const newMessage = new Messages({ conversationId, senderId, message })
        console.log("newMessage", newMessage);
        await newMessage.save();
        return res.status(200).send({ status: 200, message: (" Conversation  Message  Succefull") });
    } catch (error) {
        return res.status(400).send({ status: 400, message: (error.message) });
    }
})


// getting Conversation Message
router.get('/messages/:conversationId', async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        console.log("conversationId", conversationId);
        const conversationMessage = await Messages.find({ conversationId })
        console.log("conversationMessage", conversationMessage);
        const messageUserData = Promise.all(conversationMessage.map(async (message) => {
            const user = await UserSch.findById(message.senderId);
            console.log("user12", user);
            return { user: { email: user.email, name: user.name }, message: message.message }
        }))
        // return res.status(200).send({ status: 200,messageUserData,conversation,message: (" Conversation Succefully") });
        return res.status(200).send(await messageUserData);
    } catch (error) {
        return res.status(400).send({ status: 400, message: (error.message) });

    }
})


// getting  All Existing User
router.get('/users', async (req, res) => {
    try {
        const allUsers = await UserSch.find().select('-password')
        return res.status(200).send({ status: 200, allUsers, message: 'All users retrieved successfully' });
    } catch (error) {
        return res.status(400).send({ status: 400, message: error.message });
    }
});


// getting user
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const conversation = await ConversationSch.find({ members: { $in: [userId] } })
        const currentUserInfo = await UserSch.findById(userId).select("-password");
        return res.status(200).send({ status: 200, currentUserInfo, conversation, message: (" Conversation Succefully") });
    } catch (error) {
        return res.status(400).send({ status: 400, message: (error.message) });

    }
})
export default router;
import mongoose from "mongoose";
const {Schema} = mongoose;

const messageSchema = new Schema({
    conversationId:{
        type:Array,
        required:true   
    },
    senderId:{
        type:Schema.Types.String,
        required:true 
    },
    message:{
        type:Schema.Types.String,
        required:true 
    },
    // email:{
    //     type:Schema.Types.String,
    //     required:true,
    //     // unique:true 
    // },
    // phone:{
    //     type:Schema.Types.Number,
    //     // required:true   
    // },
    // password:{
    //     type:Schema.Types.String,
    //     required:true   
    // },
    // timestamps: {
    //     type:Boolean,
    //     createdAt: 'created_Time',
    //     updatedAt: 'updated_Time' 
    //   }
    
});

const Messages = mongoose.model('Messages', messageSchema);

export default Messages;

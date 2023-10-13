import mongoose from "mongoose";
const {Schema} = mongoose;

const conversationSchema = new Schema({
    members: {
        type: Array,
        required:true
    }
    // email:{
    //     type:Schema.Types.String,
    //     required:true,
    //     unique:true 
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

const ConversationSch = mongoose.model('conversation', conversationSchema);

export default ConversationSch;

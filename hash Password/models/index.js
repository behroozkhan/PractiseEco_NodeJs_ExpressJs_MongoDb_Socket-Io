import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:Schema.Types.String,
        required:true   
    },
    email:{
        type:Schema.Types.String,
        required:true,
        unique:true 
    },
    phone:{
        type:Schema.Types.Number,
        required:true   
    },
    password:{
        type:Schema.Types.String,
        required:true   
    }
    
})

const UserSch = mongoose.model('UserSch', userSchema);

export default UserSch;

import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(`mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@ultratriotech.1nzsidg.mongodb.net/jwt_joi_chalk?retryWrites=true&w=majority`);


export default mongoose;

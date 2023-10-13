import mongoose from "mongoose";
import 'dotenv/config';

mongoose.connect(`mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@ultratriotech.1nzsidg.mongodb.net/ECOM-STORE?retryWrites=true&w=majority`);


export default mongoose;
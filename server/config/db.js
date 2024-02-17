import { connect } from 'mongoose';

console.log(process.env.MONGO_URI);

const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }
    catch(e)
    {
        console.log(e);
        process.exit(1);
    }
}

export default connectDB;
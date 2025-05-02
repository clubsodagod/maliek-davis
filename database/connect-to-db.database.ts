import { connect, set } from "mongoose";
import dotenv from 'dotenv';

// load env file
dotenv.config()

const MONGO_DB_URI = process.env.MONGODB_URI;

// connect to the database

export default async function connectToDB() {

    try {
        set('strictQuery', false);
        const db = await connect(MONGO_DB_URI ? MONGO_DB_URI : '');

        console.log('MongoDB connected to', db.connection.name);

    } catch (error) {

        console.error(error);
        // Emit an event when there's an error

    }
}
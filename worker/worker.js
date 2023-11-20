import connectDB from './db/db.js'
import dotenv from 'dotenv';
import connectToQueue from './queue.js'

dotenv.config()

connectToQueue().then(() => {
    console.log("Worker connected to RabbitMQ queue")
    connectDB(process.env.MONGODB_CONNECTION_URL).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB: ", err);
        return
    })
}).catch((err) => {
    console.log("Error in connecting to RabbitMQ queue: ", err);
    return
})

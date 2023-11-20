import amqp from 'amqplib';
import HandleNewLog from './controllers/log.controller.js';

export default async function connectToQueue() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_CONNECTION_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(process.env.RABBITMQ_QUEUE, {durable: false})
        channel.consume(process.env.RABBITMQ_QUEUE, async (message) => {
            console.log("Got a new log: ", JSON.parse(message.content.toString()));
            await HandleNewLog(JSON.parse(message.content.toString()))
        }, {
            noAck: true
        })
    } catch (error) {
        console.log("Error in connecting to RabbitMQ queue: ", error);
        throw error   
    }
}

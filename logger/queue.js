import amqp from 'amqplib';
import LogEntry from './models/log.js';

export default async function ConnectToRabbitMQ(app) {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_CONNECTION_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(process.env.RABBITMQ_QUEUE_NAME, { durable: false });

        app.post('/log', (req, res) => {
            const newLog = new LogEntry(req.body);
            channel.sendToQueue(process.env.RABBITMQ_QUEUE_NAME, Buffer.from(JSON.stringify(newLog)))
            res.send({
                message: "Added log to queue successfully",
                success: true,
            })
        })
    } catch (error) {
        console.log(`Error in connecting to RabbitMQ: ${error}`)
        throw error
    }
}
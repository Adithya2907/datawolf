import express from 'express';
import dotenv from 'dotenv';
import ConnectToRabbitMQ from './queue.js';

dotenv.config();
const app = express();
app.use(express.json());

ConnectToRabbitMQ(app)
    .then(() => {
        console.log("Successfully connected to rabbitMQ");
        app.listen(process.env.PORT, () => {
            console.log(`Injestor listening on port ${process.env.PORT}`)
        })
    }).catch(err => {
        console.log(`Error in connecting to RabbitMQ: ${err}`)
    })


import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    level: {
        type: String,
        enum: ['info', 'warn', 'error', 'debug'],
        default: 'info'
    },
    message: String,
    resourceId: String,
    timestamp: Date,
    traceId: String,
    spanId: String,
    commit: String,
    metadata: new Schema({
        parentResourceId: String,
    }),
});

export default mongoose.model('Log', LogSchema);
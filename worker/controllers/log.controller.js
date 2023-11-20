import LogModel from '../db/model/log.js';

export default async function HandleNewLog(log) {
    const { level, message, resourceId, timestamp, traceId, spanId, commit, metadata } = log;
    LogModel.collection.insertOne({level, message, resourceId, timestamp, traceId, spanId, commit, metadata})
        .then((result) => {
            console.log("Inserted new log: ", result);
        }).catch((err) => {
            console.log("Error inserting new log: ", err);
        })
}
import mongoose from 'mongoose';

export default function connect(url) {
    return mongoose.connect(url);
}
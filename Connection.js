const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_CLUSTER;

async function connectToMongoDB() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to MongoDB cluster');
        // You can perform database operations here
    } catch (err) {
        console.error('MongoDB connection error:', err);
    } finally {
        await client.close();
    }
}

connectToMongoDB();
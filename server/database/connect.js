import mongoose from "mongoose";
import ENV from '../config.js';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

// import { MongoMemoryServer } from "mongodb-memory-server";

async function connect() {
    // const mongod = await MongoMemoryServer.create();
    // const getUri = mongod.getUri();

    mongoose.set("strictQuery", true);
    // const db = await mongoose.connect(getUri);
    const db = await mongoose.connect(ENV.ATLAS_URI);
    const test = new MongoClient(ENV.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    console.log("Database Connected");
    return db;
};


export default connect;
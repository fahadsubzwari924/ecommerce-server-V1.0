import { connectToDatabase } from '../database/connection';
import { Mongoose } from 'mongoose';

export function getDatabaseObject(db, host='localhost:27017') {
    return connectToDatabase(db, host)
}
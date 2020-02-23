// const mongoose = require('mongoose');
import MongoClient from 'mongodb';
const DATABASE_URL = 'mongodb://127.0.0.1:27017';

// export async function initializeDatabase() {
//   try {
//     await mongoose.connect(DATABASE_URL, {
//       useNewUrlParser: true
//     });
//     console.log('Connected to database');
//   }
//   catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export function initializeDatabase() {
  MongoClient.connect(DATABASE_URL, (error, client) => {
    if (error) {
      return console.log(error);
    }

    let db = client.db('pan_db');
    return db;
  })
}

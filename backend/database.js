const mongoose = require('mongoose');

const DATABASE_URL = 'mongodb://127.0.0.1:27017/daily-planner-db';

export async function initializeDatabase() {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true
    });
    console.log('Connected to database');
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

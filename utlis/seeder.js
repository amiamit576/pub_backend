import mongoose from 'mongoose';
import ConnectToDB from '../config/dbConnection.js';
import dotenv from 'dotenv';



dotenv.config();

const seedData = async (model, data) => {
  try {
    await ConnectToDB();
    console.log('Connected to MongoDB, seeding data...');

    // Clear the collection
    await model.deleteMany();
    console.log(`${model.collection.name} cleared`);

    // Seed new data
    await model.insertMany(data);
    console.log(`${model.collection.name} seeded successfully!`);

  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();  
    console.log('Database connection closed.');
  }
};

export default seedData;

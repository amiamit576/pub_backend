import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const ConnectToDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI
    );
    if (connection) {
      console.log(`Connected to MongoDB: ${connection.connection.host}`);
    }
  } catch (e) {
    console.log(e);
    process.exit(1); 
  }
};

export default ConnectToDB;

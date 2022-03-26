import mongoose from 'mongoose';

export const createConnection = async (databaseURI: string): Promise<void> => {
  await mongoose.connect(databaseURI);
};

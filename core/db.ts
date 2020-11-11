import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI as string;
mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export { db, mongoose };

import mongoose from 'mongoose';

mongoose.connect('mongodb://mongo:27017/db', { useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database is connected ...')
});

export default db;
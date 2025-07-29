require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.Routes');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => console.error('Connection error: ', err))


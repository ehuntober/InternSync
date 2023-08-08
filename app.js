require('dotenv').config();
// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import route files
const authRoutes = require('./src/routes/authRoutes');
const internRoutes = require('./src/routes/internRoutes');
const organizationRoutes = require('./src/routes/organizationRoutes');
const internshipPostRoutes = require('./src/routes/internshipPostRoutes');
// const applicationRoutes = require('./src/routes/applicationRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// Create Express app
const app = express();

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/internship-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

// Use body-parser middleware to parse JSON data from requests
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/interns', internRoutes);
app.use('/api/organizations', organizationRoutes);
app.use('/api/internship-posts', internshipPostRoutes);
// app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

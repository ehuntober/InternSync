const express  = require('express');
const mongoose = require('mongoose')
const internshipRoutes = require('./routes/internships')
const studentRoutes = require('./routes/students');

// const matchRoutes = require('./routes/matching');


const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json())

mongoose.connect('mongodb://localhost/internship-app',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database') 
  })

  .catch(err => {
    console.error('Failed to connect to the database',err);
    process.exit(1);

  });



  app.use('/internships',internshipRoutes);
  app.use('/students',studentRoutes);
//   app.use('/matching',matchRoutes);


  app.get('/', (req, res) => {
    res.send('Welcome to the InterSync: Your best internship App');
  }); 


  app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}`) 
  })
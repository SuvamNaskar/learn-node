const express = require('express');
const mongoose = require('mongoose');
const homeRoutes = require('./routes/index');
const taskApiRoutes = require('./routes/task-api');
const methodOverride = require('method-override');

const connectDB = require('./Connection');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true })); // For form data
app.use(express.json());
app.use(methodOverride('_method')); // For PUT/DELETE via forms

app.use('/', homeRoutes);
app.use('/api', taskApiRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

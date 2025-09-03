const express = require('express');
const userRoutes = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

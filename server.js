const express = require('express');
var path = require('path');
var htmlRoutes = require('./routes/htmlRoutes')
const apiRoutes = require('./routes/apiRoutes')
​
// Tells node that we are creating an "express" server
const app = express();
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;
​
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
​
app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
​
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
​
// The below code effectively "starts" our server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
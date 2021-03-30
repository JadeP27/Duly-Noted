const express = require('express');
var htmlRoutes = require('./routes/htmlRoutes')

// Tells node that we are creating an "express" server
const app = express();
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use("/", htmlRoutes);

// The below points our server to a series of "route" files.
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)

// The below code effectively "starts" our server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
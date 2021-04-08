const express = require('express');
const fs = require("fs");
var path = require('path');
// var htmlRoutes = require('./routes/htmlRoutes')
// const apiRoutes = require('./routes/apiRoutes')
const notes = require("./db/db.json");

// Tells node that we are creating an "express" server
const app = express();
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use('/api', apiRoutes);
// app.use("/", htmlRoutes);

app.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// ROUTING

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

function noteIds() {
  tableData.forEach((newNote, i) => {
    newNote.id = i++;
  });
}

// API GET Requests
app.get("/api/notes", (req, res) => {
  let tableData = JSON.parse(fs.readFile("./db/db.json", "utf8"));
  res.json(tableData)
  }); 

// API POST Requests
app.post("/api/notes", (req, res) => {
  const notes = req.body;
  notes.id = req.body.title
  tableData.push(notes);
  fs.writeFileSync("./db/db.json", JSON.stringify(tableData));
  res.json(notes);
  noteIds();
  });

// Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
// It will do this by sending out the value "true" have a table
// req.body is available since we're using the body parsing middleware

app.delete("/api/notes/:id", (req, res) => {
  const noteNum = req.params.id;
  for (var i = 0; i < tableData.length; i++) {
    if (tableData[i].id == noteNum) {
      // Empty out the arrays of data
      tableData.length = 0;
      waitListData.length = 0;
      res.json({ ok: true });
      console.log("Deleted note with id " + req.params.id);
      noteIds();
    }
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(tableData));
    res.json(tableData);
});

// The below code effectively "starts" our server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
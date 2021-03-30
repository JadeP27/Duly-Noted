const fs = require("fs");
let tableData = require("../db/db.json");
​
function noteIds() {
  tableData.forEach((newNote, i) => {
    newNote.id = i++;
  });
}
​
module.exports = function (app) {
  // API GET Requests
  app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function(err, tableData ) {
      res.json(tableData);
    })
     
  });
​
  // API POST Requests
  app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    res.redirect("/")
​
  });
  // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
  // It will do this by sending out the value "true" have a table
  // req.body is available since we're using the body parsing middleware
  
  app.delete("/api/notes/:id", function (req, res) {
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
};

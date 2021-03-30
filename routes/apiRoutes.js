const tableData = require("../db/db.json");
const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  fs.readFile("db/db.json","utf8", (err, data) => {

    if (err) throw err;

    var notes = JSON.parse(data);
  // API GET Requests
  // Below code handles when users "visit" a page.
  // ---------------------------------------------------------------------------
    app.get("/api/tables", function(req, res) {
    res.json(tableData);
    });
  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------
    app.post("/api/Notes", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
      if (tableData.length < 5) {
        tableData.push(req.body);
        res.json(true);
      }
      else {
        waitListData.push(req.body);
        res.json(false);
      }
    });
    app.delete("/api/notes/id", function(req, res) {
      // Empty out the arrays of data
      tableData.length = 0;
      waitListData.length = 0;

      res.json({ ok: true });
    });
  })
}

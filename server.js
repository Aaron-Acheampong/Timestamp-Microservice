 // server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api", (req, res) => {
  let now = new Date();
  res.json({
    "unix": now.getTime(), 
    "utc": now.toUTCString()
  });
});



app.get("/api/:date_input", (req, res) => {
  let input = req.params.date_input;

  if(parseInt(input) > 10000) {
    let unixtype = new Date(parseInt(input));
    res.json({
      "unix": unixtype.getTime(), 
      "utc": unixtype.toUTCString()
    });
  }



  let passedDate = new Date(input);

  if(passedDate == "Invalid Date"){
    res.json({
      "error": "Invalid Date"
    });
  }
  else {
    res.json({
      "unix": passedDate.getTime(), 
      "utc": passedDate.toUTCString()
    });
  }

});



// listen for requests :)
const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

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


app.get('/api/timestamp', (req, res) => {
  let date_obj = {};
  date_obj['unix'] = new Date().getTime();
  date_obj['utc'] = new Date().toUTCString();
  res.json(date_obj);
});



app.get('/api/timestamp/:date_input', (req, res) => {
  let input = req.params.date_input;
  let date_obj = {};

  if(date_input.includes('-')){
    date_obj['unix'] = new Date(input).getTime();
    date_obj['utc'] = new Date(input).toUTCString();
  }
  else {
    input = parseInt(input);
    date_obj['unix'] = new Date(input).getTime();
    date_obj['utc'] = new Date(input).toUTCString();
  }

  if(!date_obj['unix'] || !date_obj['utc']){
    res.json({"error": "Invalid Date"});
  }
  
  res.json(date_obj);
});



// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
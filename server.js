var express = require('express');
var twilio = require('twilio');
var app = express();

var client = new twilio.RestClient('AC6f5ae87943e827a9313e51d467f80fd3', '5637ebdf8b2a6286f85e160d89b92427');

// app.use(express.static(__dirname + './src/lib'));
// app.use('/lib', express.static(__dirname + './src/lib'));
app.use('/lib', express.static(__dirname + '/src/lib'));
app.use('/ui', express.static(__dirname + '/src/ui'));
app.use('/data', express.static(__dirname + '/src/data'));
// app.use("/lib", express.static(__dirname + './src/lib'));

// a convenient variable to refer to the HTML directory
var html_dir = './src/';

// routes to serve the static HTML files
app.get('/', function(req, res) {
    res.sendfile(html_dir + 'index.html');
});
// Note: route names need not match the file name
app.get('/poi', function(req, res) {
    res.sendfile(html_dir + 'poi.html');
});
app.get('/events', function(req, res) {
    res.sendfile(html_dir + 'events.html');
});

app.get('/sendText',function(req,res){
	client.sms.messages.create({
    to:'+14153519635',
    from:'+14252742716',
    body:'ahoy hoy! Testing Twilio and node.js'
}, function(error, message) {
    // The HTTP request to Twilio will run asynchronously. This callback
    // function will be called when a response is received from Twilio
    // The "error" variable will contain error information, if any.
    // If the request was successful, this value will be "falsy"
    if (!error) {
        // The second argument to the callback will contain the information
        // sent back by Twilio for the request. In this case, it is the
        // information about the text messsage you just sent:
        console.log('Success! The SID for this SMS message is:');
        console.log(message.sid);
 
        console.log('Message sent on:');
        console.log(message.dateCreated);
    } else {
        console.log('Oops! There was an error.');
    }
});


});


var port = process.env.PORT || 5000;
 app.listen(port, function() {
   console.log("Listening on " + port+' '+__dirname);
 });
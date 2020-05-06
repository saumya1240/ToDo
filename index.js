var express = require('express');
var controller = require('./controller/todoController');

var app = express();

//to set up template
app.set('view engine', 'ejs');

//to setup middleware
app.use(express.static('./public'));

//to call controller
controller(app);

//to listen to server
app.listen(3000);
console.log('You are listening to port 3000');
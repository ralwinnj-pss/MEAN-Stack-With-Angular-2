 const express = require('express');
 const app = express();
 const router = express.Router();
 const mongoose = require('mongoose');
 const config = require('./config/database');
 const path = require('path');
 const authentication = require('./routes/authentication')(router);
 const bodyParser = require('body-parser');
 const cors = require('cors');


 console.log("URL > " + config.uri);
 mongoose.Promise = global.Promise;
 mongoose.connect(config.uri, (err) => {
     if (err) {
         console.log('could NOT connect to database: ', err);
     } else {
         console.log('connected to database: ' + config.db);
     }
 });


 const corsOptions = {
     origin: 'http://localhost:4200',
 }

 /* Middleware  Start */

 // cors (allow cross origin request to the server(dev only))
 app.use(cors(corsOptions));

 // body-parser (request body from the request)
 app.use(bodyParser.urlencoded({
     extended: false
 }));
 // body-parser (convert request body to json format) 
 app.use(bodyParser.json());

 // serve static files,  in this case it will be the built version of our angular application
 app.use(express.static(__dirname + '/client/dist/'));

 // set main route for all athentication routes/methods e.g. /authentication/login
 app.use('/authentication', authentication);

 // Set the default route 
 app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname + '/client/dist/index.html'));
 });

 // Start server and start listening
 app.listen(8080, () => {
     console.log('Listening on port 8080....');
 });
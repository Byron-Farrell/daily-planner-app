import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { initializeDatabase } from './database.js'

// Server port
const PORT = 3000;
// Folder containing files from angular after the build process
const STATIC_FILES_PATHS = path.join(__dirname + '/dist/');

const app = express();



// Connecting to database
const db = initializeDatabase();

// Static files directories
app.use(express.static(STATIC_FILES_PATHS));

// Home page
app.get('/', function(request, response) {
  response.sendFile(distFolderPath + 'index.html');
});

app.get('/signup', function(request, response) {
  response.sendFile(distFolderPath + 'signup.html');
});

app.get('/login', function(request, response) {
  response.sendFile(distFolderPath + 'login.html');
});

// app.put('/get-diary', function(request, response) => {
//   response.send('Hello World');
// })
//
// app.put('/create-diary', function(request, response) => {
//   response.send('Hello World');
// })
//
// app.post('/update-diary', function(request, response) => {
//   response.send('Hello World');
// })
//
// app.delete('/delete-diary', function(request, response) => {
//   response.send('Hello World');
// })


app.listen(port, () => console.log(`Listening on port ${PORT}.`));

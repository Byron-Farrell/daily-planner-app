import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { initializeDatabase } from './database.js'

const app = express();
const port = 3006;
// Folder containing files from angular after the build process
const distFolderPath = path.join(__dirname + '/dist/');


// Connecting to database
initializeDatabase();

// Static files directories
app.use(express.static(distFolderPath));

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


app.listen(port, () => console.log(`Listening on port ${port}.`));

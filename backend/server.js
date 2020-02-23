// ============================================
//                   IMPORTS
// ============================================


// ---------------- EXPRESS-JS ----------------
import express from 'express';

// ------------ EXPRESS MIDDLEWARE ------------
import bodyParser from 'body-parser';

// ----------------- DATABASE -----------------
import MongoClient from 'mongodb';

// ------------------ OTHER -------------------
import path from 'path';
import bcrypt from 'bcrypt'; // encryption


// ============================================
//                VARIABLES
// ============================================


const PORT = 3000;
const DATABASE_URL = 'mongodb://127.0.0.1:27017';
// Folder containing files from angular after the build process
const STATIC_FILES_PATH = path.join(__dirname + '/dist/');
// ExpressJs object
const app = express();
// MongoDB database object
let db;


// ============================================
//             DATABASE SETUP
// ============================================


MongoClient.connect(DATABASE_URL, (error, client) => {
  if (error) {
    return console.log(error);
  }

  db =  client.db('pan_db');
});


// ============================================
//                EXPRESS SETUP
// ============================================


// ------------- Middleware setup -------------

app.use(express.static(STATIC_FILES_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// ------------- Routing Setup -------------

app.get('/', (request, response) => {
  response.sendFile(STATIC_FILES_PATH + 'index.html');
});

app.get('/signup', (request, response) => {
  response.sendFile(STATIC_FILES_PATH + 'signup.html');
});

app.post('/signup', (request, response) => {

  db.collection('user').findOne({username: request.body.username}, (error, result) => {
    if (error) throw error;
    console.log(result);
    if (result === null) {
      bcrypt.hash(request.body.password, 10, (error, hash) => {
        db.collection('user').insertOne({username: request.body.username, password: hash});
      });

      response.redirect('/');
    }
  });

  response.sendFile(STATIC_FILES_PATH + 'signup.html');
});

app.get('/login', (request, response) => {

  response.sendFile(STATIC_FILES_PATH + 'login.html');
});

app.post('/login', (request, response) => {
  db.collection('user').findOne({username: request.body.username}, (error, result) => {
    if (error) throw error;

    bcrypt.compare(request.body.password, result.password, (error, match) => {
      if (error) throw error;

      if (match) {
        // password match
        response.redirect('/');
      }
    });
  });
  response.sendFile(STATIC_FILES_PATH + 'login.html');
});

// ------------ Starting Server ------------

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

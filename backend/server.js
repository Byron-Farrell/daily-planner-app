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
import jwt from 'jsonwebtoken';


// ============================================
//                VARIABLES
// ============================================

const PORT = 3000;
const DATABASE_URL = 'mongodb://127.0.0.1:27017';
// Folder containing files from angular after the build process
const STATIC_FILES_PATH = path.join(__dirname + '/dist/');
// ExpressJs object
const app = express();
const secret_key = 'secret_key_:)';
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
app.use(bodyParser.urlencoded({ extended: true }));

// -------------- Routing setup ---------------
app.get('/', (request, response) => {
  response.sendFile(STATIC_FILES_PATH + 'index.html');
});

app.post('/signup', (request, response) => {

  db.collection('user').findOne({username: request.body.username}, (error, result) => {
    if (error) throw error;

    // Username does not exist
    if (result === null) {
      bcrypt.hash(request.body.password, 10, (error, hash) => {
        if (error) throw error;

        db.collection('user').insertOne({
          username: request.body.username,
          password: hash,
          secretQuestion: request.body.secretQuestion,
          secretAnswer: request.body.secretQuestion
        });

        db.collection('user').findOne({username: request.body.username}, (error, result) => {
          if (error) throw error;
          console.log(result);
          let token = jwt.sign({ id: result._id, username: result.username }, secret_key); // Sigining the token

          response.status(200);
          response.json({
            'success': true,
            'token': token,
            'errorMessage': null
          });
        });



      });
    }
    else {
      response.status(400);
      response.json({
        'success': false,
        'errorMessage': 'Username already exists'
      })
    }
  });
});

app.post('/login', (request, response) => {
  console.log(request.body);

  db.collection('user').findOne({username: request.body.username}, (error, result) => {
    if (error) throw error;

    // User exists
    if (result !== null) {
      bcrypt.compare(request.body.password, result.password, (error, match) => {
        if (error) throw error;

        if (match) {
          console.log(result._id);
          // password match
          let token = jwt.sign({ id: result._id, username: result.username }, secret_key); // Sigining the token
          response.status(200);
          response.json({
            'success': true,
            'token': token,
            'errorMessage': null
          })
        }
        else {
          response.status(401);
          response.json({
            'success': false,
            'errorMessage': 'Inccorect password'
          });
        }
      });
    }
    else {
      response.status(401).json({
        'success': false,
        'errorMessage': 'Username does not exist'
      });
    }
  });
});

app.all('*', (request, response) => {
  response.redirect('/');
});

// ------------ Starting Server ------------

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

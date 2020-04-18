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
import { checkToken, verifyToken } from './handlers.js'

// FIXME: MVC
// Routes
// Model
// View? - static files
// Controller
// r
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

app.get('/diary', [checkToken, verifyToken], (request, response) => {
  db.collection('user').findOne({username: request.authorizedData.username}, (error, result) => {
    if (error) throw error;

    // Username does not exist
    if (result === null) {
      response.status(400);
      response.json({
        'success': false,
        'errorMessage': 'Username does not exist'
      });
    }
    else {
      response.status(200);
      response.json({
        'success': true,
        'errorMessage': null,
        'diaries': result.diary
      });
    }

  })
})

app.post('/diary', [checkToken, verifyToken], (request, response) => {
  db.collection('user').findOne({'username': request.authorizedData.username},{'projection':{'diary': {$elemMatch: {'title': request.body.title}}}}, (error, result) => {
    if (result.diary !== undefined) {
      response.status(400);
      response.json({
        'success': false,
        'errorMessage': 'Title already exists'
      });
    }
    else {
      db.collection('user').updateOne(
        {username: request.authorizedData.username},
        {
          $push: {
            'diary': {
              'title': request.body.title,
              'content': request.body.content
            },
          }
        }, (error, result) => {

        if (error) throw error;

        response.status(200);
        response.json({
          'success': true,
          'errorMessage': null
        });
      });
    }
  });

});

app.post('/signup', (request, response) => {

  db.collection('user').findOne({username: request.body.username}, (error, result) => {
    if (error) throw error;

    // Username does not exist
    if (result === null) {
      let passwordHash = bcrypt.hashSync(request.body.password, 10);
      let secretAnswerHash = bcrypt.hashSync(request.body.secretAnswer, 10);

      db.collection('user').insertOne({
        username: request.body.username,
        password: passwordHash,
        secretQuestion: request.body.secretQuestion,
        secretAnswer: secretAnswerHash
      });

      db.collection('user').findOne({username: request.body.username}, (error, result) => {
        if (error) throw error;
        let token = jwt.sign({ id: result._id, username: result.username }, secret_key); // Sigining the token

        response.status(200);
        response.json({
          'success': true,
          'token': token,
          'errorMessage': null
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
  db.collection('user').findOne({username: request.body.username}, (error, result) => {
    if (error) throw error;

    // User exists
    if (result !== null) {
      bcrypt.compare(request.body.password, result.password, (error, match) => {
        if (error) throw error;

        if (match) {
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

app.put('/recover', (request, response) => {
  let passwordHash = bcrypt.hashSync(request.body.password, 10);
  db.collection('user').updateOne(
    {username: request.body.username},
    { $set: {password: passwordHash} },
    (error, result) => {
      if (error) throw error;

      if (result !== null) {
        response.status(200);
      }
      else {
        respone.status(400);
      }

      response.send();
    })
});

app.post('/recover', (request, response) => {
  db.collection('user').findOne({username: request.body.username}, (error, result) => {
    if (error) throw error;

    if (result !== null) {
      if (request.body.secretQuestion !== result.secretQuestion) {
        response.status(400);
        response.json({
          'success': false,
          'errorMessage': 'Secret question does not match'
        });
      }
      else {
        bcrypt.compare(request.body.secretAnswer, result.secretAnswer, (error, match) => {
          if (error) throw error;

          if (match) {
            response.status(200);
            response.json({
              'success': true,
            })
          }
          else {
            // error
            response.status(400);
            response.json({
              'success': false,
              'errorMessage': 'Secret answer does not match'
            });
          }
        })
      }
    }
    else {
      response.status(400);
      response.json({
        'success': false,
        'errorMessage': 'Username does not exist'
      })
    }
  })
})

app.all('*', (request, response) => {
  response.redirect('/');
});

// ------------ Starting Server ------------

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

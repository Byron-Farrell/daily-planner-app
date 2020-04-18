import jwt from 'jsonwebtoken';

export function checkToken(request, response, next) {
  const header = request.headers['authorization']

  if (typeof header !== 'undefined') {
    const bearer = header.split(' ');
    const token = bearer[1];

    request.token = token;
    next();
  } else {
    //If header is undefined return Forbidden (403)
    response.sendStatus(403)
  }
}


export function verifyToken(request, repsonse, next) {
  jwt.verify(request.token, 'secret_key_:)', (err, data) => {
    if(err){
      response.sendStatus(403);
    } else {
      request.authorizedData = data;
      next();
    }
  })
}

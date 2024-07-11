const jwt = require('jsonwebtoken');
// Validar el estado del Token
exports.verifyToken = function(req,res,next) {
  if (!req.headers.authorization) return res.status(401).json('No autorizado.');
  const token = req.headers.authorization.substr(7);
  if (token!=='') {
    const content = jwt.verify(token,process.env.AUTH_TOKEN_KEY);
    req.data = content;
    next()
  } else{
    res.status(401).json('Token vacío.');
  }
}
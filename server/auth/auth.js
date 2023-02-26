module.exports = function isAuthorized(req, res, next) {
    const auth = req.headers.authorization;
    if (auth === 'secreatpassword') {
      next();
    } else {
      res.status(401);
      res.send('Not permitted')
    }
  }
  
const passport = require("passport");

exports.isAuth = () => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = (req) => {
    var token = null;
    if(req && req.cookies){
      token = req.cookies['jwt']
    }
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWFiYzJjODQxMmYxOGEzOGFmZTU1MyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4ODkxMDkyNX0.osj4cqvWBvkFq_K_KYWYdKFwMXUgDI6TyEvXRP8KpPA";
    return token;
  }
  
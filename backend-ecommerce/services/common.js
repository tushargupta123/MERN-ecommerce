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
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWE5M2IwYmYzMDM1ZDU2NWMyZjU1OCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjg4OTA1NTY3fQ.KRt9CyWl_68dqNYQx9zxCb0JXnrZuABnZRc-7HREQEA";
    return token;
  }
  
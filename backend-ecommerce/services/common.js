const passport = require("passport");

exports.isAuth = (req,res,next) => {
  passport.authenticate('jwt',(err,user) => {
      if(err) {
          next(err);
      }
      if(!user){
          return res.status(401).json({
              message:'unauthorized access'
          })
      }
      req.user = user;
      next();
  })(req,res,next);
}

  
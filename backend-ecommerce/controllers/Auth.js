const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  try {
    const response = await User.create(req.body);
    const token = response.genJWT();
    res.status(201).json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      res.status(400).json("invalid credentials");
    }
    if(!user.comparePassword(req.body.password)){
      res.status(400).json("invalid credentials");
    }
    const token = user.genJWT();
    res.status(200).json(token);
  } catch (err) {
    res.status(500).json(err);
  }
};

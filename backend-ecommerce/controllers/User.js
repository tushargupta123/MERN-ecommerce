const { User } = require("../model/User");

exports.createUser = async(req,res) => {
    const user = new User(req.body);
    try{
        const response = await user.save();
        res.status(201).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchUserById = async(req,res) => {
    try{
        const response = await User.findById(req.params.id);
        res.status(200).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.updateUser = async(req,res) => {
    try{
        const response = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        console.log(response)
        res.status(200).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}
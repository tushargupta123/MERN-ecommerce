const { User } = require("../model/User");

exports.fetchUserById = async(req,res) => {
    try{
        const response = await User.findById(req.user.id);
        res.status(200).json({id:response.id,role:response.role,addressess:response.addressess,email:response.email});
    }catch(err){
        res.status(400).json(err);
    }
}

exports.updateUser = async(req,res) => {
    try{
        const response = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}
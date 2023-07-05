const { User } = require("../model/User");

exports.createUser = async(req,res) => {
    const user = new User(req.body);
    try{
        const response = await User.save();
        res.status(200).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}
 
exports.loginUser = async(req,res) => {
    try{
        const response = await User.findOne({email:req.body.email});
        if(!response){
            res.status(401).json({message: "user not authenticated"});
        }else if(response.password===req.body.password){
            res.status(200).json({id:response.id,email:response.email,addressess:response.addressess,orders:response.orders});
        }else{
            res.status(401).json({message: "user not authenticated"});
        }
    }catch(err){
        res.status(400).json(err);
    }
}
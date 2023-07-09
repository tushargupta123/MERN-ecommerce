const { Cart } = require("../model/Cart");

exports.addToCart = async(req,res) => {
    const cart = new Cart({...req.body,user:req.user.id});
    try{
        const response = await cart.populate('product');
        response.save()
        res.status(201).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchCartByUser = async(req,res) => {
    try{
        const response = await Cart.find({user:req.user.id}).populate('user').populate('product');
        res.status(200).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}
exports.updateCart = async(req,res) => {
    try{
        const response = await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true}).populate('product');
        res.status(200).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}
exports.deleteFromCart = async(req,res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({success:true});
    }catch(err){
        res.status(400).json(err);
    }
}
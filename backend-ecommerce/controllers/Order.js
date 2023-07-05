const { Order } = require("../model/Order");

exports.createOrder = async(req,res) => {
    const order = new Order(req.body);
    try{
        const response = await order.save();
        res.status(201).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}

exports.fetchOrderByUser = async(req,res) => {
    try{
        const response = await Order.find({user:req.query.user});
        res.status(200).json(response);
    }catch(err){
        res.status(400).json(err);
    }
}
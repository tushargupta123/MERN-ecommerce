const { Brand } = require("../model/Brand")

exports.fetchBrands = async(req,res) => {
    try{
        const brands = await Brand.find();
        res.status(200).json(brands);
    }catch(err){
        res.status(400).json(err);
    }
}
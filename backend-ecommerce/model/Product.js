const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:[0,'Price should be more than zero']
    },
    discountPercentage:{
        type:Number,
        min:[0,'Discount Percentage should be greater than zero'],
        max:[100,'Discount Percentage should be less than 100%']
    },
    rating:{
        type:Number,
        required:true,
        default:0,
        max:[5,'Rating must be less than 1'],
    },
    stock:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    images:[
        {
            type:String
        }
    ],
    deleted:{
        type:Boolean,
        default:false
    }
})

const virtual = productSchema.virtual('id');
virtual.get(function() {
    return this._id;
})

productSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){
        delete ret._id
    }
})

exports.Product = mongoose.model('Product',productSchema)
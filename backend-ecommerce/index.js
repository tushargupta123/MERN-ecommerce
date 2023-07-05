const express = require('express');
const server = express();
const mongoose = require('mongoose');
const productRouters = require('./routes/Products')
const brandRouters = require('./routes/Brands')
const categoryRouters = require('./routes/Categories')
const userRouters = require('./routes/User');
const authRouters = require('./routes/Auth');
const cartRouters = require('./routes/Cart');
const orderRouters = require('./routes/Order');
const cors = require('cors')

server.use(express.json());
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}))

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
}

main().catch(err=> console.log(err))
server.use('/products', productRouters);
server.use('/brands',brandRouters)
server.use('/categories',categoryRouters)
server.use('/users',userRouters)
server.use('/auth',authRouters)
server.use('/cart',cartRouters)
server.use('/orders',orderRouters)

server.listen('8080',() => {
    console.log("server started on port 8080");
    main();
    console.log("mongodb connected")
})
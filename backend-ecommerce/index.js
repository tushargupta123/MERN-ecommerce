const express = require('express');
const server = express();
const mongoose = require('mongoose');
const productRouters = require('./routes/Products')
const brandRouters = require('./routes/Brands')
const categoryRouters = require('./routes/Categories')
const cors = require('cors')

server.use(express.json());
server.use(cors())

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
}

main().catch(err=> console.log(err))
server.use('/products', productRouters);
server.use('/brands',brandRouters)
server.use('/categories',categoryRouters)

server.listen('8080',() => {
    console.log("server started on port 8080");
    main();
    console.log("mongodb connected")
})
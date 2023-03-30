// console.log("Hello Ji");

const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

// to get data lts we have middeware over here

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routes part to show entered thing on the web browser

app.get('/',(req,res) =>{

    res.send('Hello working Api')
} )



// app.listen(3000, () => {

//     console.log("Node Server is Running")

// })


// here we are getting data from database using get method

app.get('/products',async(req,res) => {

    try {
        
        const products = await Product.find({});
        res.status(200).json(products);

    } catch (error) {
        
        res.status(500).json({message:error.message})
    }
})

app.get('/products/:id',async(req,res) => {

    try {

        const {id} = req.params;
         const product = await Product.findById();
        res.status(200).json(product);
        
    } catch (error) {
        
         res.status(500).json({message:error.message})
    }
})

app.post('/product', async(req,res) => {

    try {
        
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error) {
        
        console.log(error.message);
        res.status(500).json({message:error.message})
    }

    console.log(req.body);
    res.send(req.body)

})


// create oe update data in database 

//update the product

app.put('products:id',async(req,res) => {

    try {
        
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);

        // when we were not able to find product by id
        if(!product){

            return res.status(404).json({message: 'cannot find any product with ID ${id}'})
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

        // res.status(200).json(product);


    } catch (error) {
        
        console.log(error.message);
        res.status(500).json({message:error.message})

    }
})


//delete a product from a database

app.delete('/products/:id' , async(req,res) => {

    try {
        
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){

            return res.status(404).json({message : 'cannot find any product from id ${id}'})
        }

        res.status(200).json(product); // return this to the client 
    } catch (error) {
        
         console.log(error.message);
        res.status(500).json({message:error.message})

    }
})

mongoose.set("strictQuery",false)

mongoose.connect('mongodb+srv://tiwari123sachin2:<password>@cluster0.td0c7zk.mongodb.net/Node-Api?retryWrites=true&w=majority')
.then(() => {

    console.log("Connected to mongodb")

    app.listen(3000, () => {

        console.log("Node Server is Running")

    });
}).catch(() => {
    console.log('error') 
})
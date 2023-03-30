const { default: mongoose } = require('mongoose')
const express = require('mongoose')

const productSchema =  mongoose.Schema(

    {

        name:{
            type:String,
            required: [true,"Please Enter a Product Name"]
        },

        quantity:{

            type: Number,
            required : true,
            default: 0
        },

        price:{

            type: Number,
            required: true,
        },

        imqge:{
            type : String,
            required : false,
        }


    },

    {
        timestamp : true
    }
)

const Product = mongoose.model('Product',productSchema);

module.exports = Product;

// if you have to store any data in a database you have to create data model , as herer i want to save product i have to use product model
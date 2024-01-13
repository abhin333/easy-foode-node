const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    product_name:String,
    price:Number,
    image :String
})

const productModel=mongoose.model("products",productSchema)
module.exports=productModel
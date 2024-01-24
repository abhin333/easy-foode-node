const mongoose =require('mongoose')
const purchaseSchema=new mongoose.Schema({
    Address:{
        type:String,
    },
    Email:{
        type:String,
    },
    Mobile:{
        type:Number,
    },
    PaymentMethod:{
        type:String,
    },
    order:[{
        
    }]
    

});

const purchaseModel=mongoose.model("orders",purchaseSchema)
module.exports=purchaseModel
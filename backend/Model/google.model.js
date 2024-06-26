const mongoose=require('mongoose')

const googleSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
})

const googleModel=mongoose.model("google",googleSchema);
module.exports=googleModel;
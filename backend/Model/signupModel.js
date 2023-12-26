const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    user_name: {
      type: String,
      require:true,
    },
    email: {
      type: String,
    },
    mobile_no:{
      type:Number,
    },
    password: {
      type: String,
    },
    confirm_password: {
      type: String,
    }
    
  });
const userModel=mongoose.model("users",userSchema)
module.exports=userModel
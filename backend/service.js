const express=require('express')
const app=express()
const cors = require('cors');
app.use(express.json())
app.use(cors());
const mongoose = require('mongoose');
const userModel=require('./Model/signupModel')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const bcrypt=require('bcrypt');


app.get('/',(req,res)=>{
    res.send("ennada myree nokkunnea");
})

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, confirm_password, mobile_no } = req.body.data;

    if (!username || !email || !password || !confirm_password || !mobile_no) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashpassword = await hashPassword(password);
    const hashConfirmPassword = await hashPassword(confirm_password);
    const newUser = await userModel.create({
      user_name: username,
      email,
      mobile_no,
      password: hashpassword,
      confirm_password: hashConfirmPassword
    });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login',async(req,res)=>{
  const { email,  password, } = req.body.data;
  try{
    const user = await userModel.findOne({ email });
    console.log("uuu",user);
    if(user==null){
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isPasswordValid =await bcrypt.compare(password, user.password).then((res)=>{
      return res
    })
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful' });

  }catch(error){
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})



mongoose.connect('mongodb://127.0.0.1:27017/west')
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log("errroccured"+err))


app.listen(3005,()=>{
    console.log("server is running");
    })
const express=require('express')
const app=express()
const cors = require('cors');
app.use(express.json())
app.use(cors());
const mongoose = require('mongoose');
const userModel=require('./Model/signupModel')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("ennada myree nokkunnea");
})

app.post('/signup', async (req, res) => {
  const { username, email, password, confirm_password,mobile_no } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const newUser = await userModel.create({
      user_name: username,
      email: email,
      mobile_no:mobile_no,
      password: password,
      confirm_password: confirm_password
    });
    res.status(200).json(newUser);

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/login',async(req,res)=>{
  const { email,  password, } = req.body;
  try{
    const user = await userModel.findOne({ email,password });
    if(!user){
      return res.status(401).json({ error: 'Invalid username or password' });
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
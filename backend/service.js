const express=require('express')
const app=express()
const cors = require('cors');
app.use(express.json())
app.use(cors({
  origin:'*'
}));

const multer = require('multer');
const mongoose = require('mongoose');
const userModel=require('./Model/signupModel')
const productModel=require('./Model/productModel')
const purchaseModel=require('./Model/purchaseModel')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');
const bcrypt=require('bcrypt');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'))



const {createToken,validateToken}=require('./JWT.JS')
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
    const accessToken=createToken(user);
    console.log("accesstoken",accessToken);

    res.cookie("access-token",accessToken,{maxAge:60*60*20*30*1000})
    res.status(200).json({accessToken, message: 'Login successful' });

  }catch(error){
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


//storage

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, path.join(__dirname, './public/Images'));
  },
  filename:(req,file,cb)=>{
    cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
});

const upload= multer({
  storage:storage                                          
})


app.post('/add', upload.single('file'), (req, res) => {
   const { productName, productPrice } = req.body;

  if (!productName || !productPrice || !req.file) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  productModel.create({
    product_name: productName,
    price: productPrice,
    image: req.file.filename,
  })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
});




app.get('/api/v1/view',async(req,res)=>{
  const allProducts =  await productModel.find({});
  console.log("eeeeee",allProducts);
  if(allProducts){
    res.status(200).json(allProducts);
  }
  else{
    res.status(500).json(allProducts)
  }
})



app.post('/api/v1/order',(req,res)=>{
  const { address,email,mobile,items,paymentMethod } = req.body;
  console.log("!!!!!!!",items);
  purchaseModel.create({
    Address:address,
    Email:email,
    mobile:mobile,
    order:items,
    PaymentMethod:paymentMethod

  }).then((response)=>{
    console.log("responmseeeeeeee",res);
    res.status(200).json(response)
  }).catch((error)=>{
    console.log("errorrequest",error);
    res.status(400).json({message:error})
  })

})







mongoose.connect('mongodb://127.0.0.1:27017/west')
  .then(() => console.log('Connected!'))
  .catch((err)=>console.log("errroccured"+err))


app.listen(3005,()=>{
    console.log("server is running");
    })
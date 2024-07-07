const express = require('express')
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors({
  origin: '*' // Replace with your frontend URL
}));

const multer = require('multer');
const mongoose = require('mongoose');
const userModel = require('./Model/signupModel')
const productModel = require('./Model/productModel')
const purchaseModel = require('./Model/purchaseModel')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
const session = require('express-session');
const passport = require('passport');
require('./passport');
const googleModel = require('./Model/google.model');


app.use(session({
  secret: 'vytft%$$#^dhuyiaysuyfw4wfgsu',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


const { createToken, validateToken } = require('./JWT.JS')


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

app.post('/login', async (req, res) => {
  const { email, password } = req.body.data;
  console.log("email", email, "pass", password);
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const accessToken = createToken(user);

    res.cookie("access-token", accessToken, { maxAge: 60 * 60 * 20 * 30 * 1000 });
    res.status(200).json({ accessToken, message: 'Login successful' });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './public/Images'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage
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

// GOOGGLE AUTH API..........................

app.get('/auth', passport.authenticate('google', {
  scope:
    ['email', 'profile']
}));

// Auth Callback 
app.get('/auth/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/callback/success',
    failureRedirect: '/auth/callback/failure'
  }));

// Success  
app.get('/auth/callback/success', async (req, res) => {
  if (!req.user)
    res.redirect('/auth/callback/failure');
  console.log("userrrrrrrr", req.user);
  const { id } = req.user;
  const { name } = req.user._json;
  const mergedUser = {
    id,
    username: name
  };
  const googleuser = await googleModel.findOne({ email: req.user._json.email });
  console.log("email", googleuser);
  if (!googleuser) {
    const newuser = new googleModel({ username: name, email: req.user._json.email });
    await newuser.save();
    console.log("newuser", newuser);
  }
  var token = await createToken(mergedUser);
  res.cookie('access_Token', token);
  res.redirect('http://localhost:5173/items');

});

// failure 
app.get('/auth/callback/failure', (req, res) => {
  res.send("http://localhost:5173/error");
})


// Logout route
app.get('/logout', (req, res) => {
  console.log("helloooo");
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).send('Error logging out');
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('Error logging out');
      }
      console.log("Session destroyed successfully");
      res.status(200).send("suuccessfuly logout");
    });
  });
});




app.get('/api/v1/view', validateToken, async (req, res) => {
  console.log("ppppppppppppppppp");
  try {
    const allProducts = await productModel.find({});
    console.log("eeeeee", allProducts);

    if (allProducts) {
      res.status(200).json(allProducts);
    } else {
      res.status(500).json({ error: 'Internal Server Error - Unable to fetch products' });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/v1/order', (req, res) => {
  const { address, email, mobile, items, paymentMethod } = req.body;
  console.log("!!!!!!!", items);
  purchaseModel.create({
    Address: address,
    Email: email,
    mobile: mobile,
    order: items,
    PaymentMethod: paymentMethod

  }).then((response) => {
    console.log("responmseeeeeeee", res);
    res.status(200).json(response)
  }).catch((error) => {
    console.log("errorrequest", error);
    res.status(400).json({ message: error })
  })

})


app.get('/admin/api/v1', async (req, res) => {
  const allorders = await purchaseModel.find({})
  console.log("eadeaaeadaea", allorders);
  if (allorders) {
    res.status(200).json(allorders)
  }
  else {
    res.status(400).json({ error: "somthig went wrong " })
  }

})


app.get('/', (req, res) => {
  res.send("ennada myree nokkunnea");
})


mongoose.connect("mongodb+srv://abhinpradeepan123:Abhin13052001@cluster0.ttt3foa.mongodb.net/west")
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));



app.listen(3005, () => {
  console.log("server is running");
})
// mongodb+srv://cluster0.ttt3foa.mongodb.net/
// //mongodb://127.0.0.1:27017/west
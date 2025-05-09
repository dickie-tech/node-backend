const asyncHandler = require ("express-async-handler");
const bcrypt = require ("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


//@desc Register a User
//@route POST /api/users/register
//@access public



const registerUser =asyncHandler(async (req,res) =>{
  const { username, email, password } = req.body;
  if(!username || !email || !password ){
    res.status(400);
    throw new Error ("All field are mandatory!");
  }
  const userAvailable = await User.findOne({email})
  if(userAvailable){
    res.status(400);
    throw new Error ("User already Exists!")
  }

  //Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hashedPassword);
  
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if(user) {
    res.status(201).json({_id: user.id, email: user.email });
  } else {
    res.status(400)
    throw new Error("User data is not valid");
  }

  
  res.json({message: "Register the User"});
});


//@desc Login a User
//@route POST /api/users/login
//@access public



const loginUser =asyncHandler(async (req,res) =>{
  const { email, password } = req.body;
  if(!email || !password ){
   res.status(400);
   throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedPassword
  if(user && (await bcrypt.compare(password, user.password))){
   const accessToken = jwt.sign(
     {
       user: {
         username: user.username,
         email: user.email,
         id: user.id,
       },
     },
     process.env.ACCESS_TOKEN_SECRET,
 {expiresIn: "3m"}
   );
   res.status(200).json({accessToken});
  }else {
   res.status(401);
   throw new Error("Email or password is not valid");
  };
 
});


//@desc Display a User's current information
//@route GET /api/users/current
//@access private

const currentUser =asyncHandler(async (req,res) =>{
  res.json({mesage: "Current user Information"});
});


module.exports = { registerUser, loginUser, currentUser }
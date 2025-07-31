const user = require("../../model/user/usermodel.js");
const bcrypt = require('bcrypt');
const saltRounds = process.env.saltRounds;
const jwt = require('jsonwebtoken');




exports.Register = async(req,res)=>{

	const { username, email, password } = req.body;
	console.log("in the register api =",username);
  try {
    // Check if user already exists
    const existingUser = await user.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new user({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error:error });
  }



}


exports.Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Generate JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Send token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email
      }
    });
  } catch (err) {
    console.log(`Error during login = ${err}`);
    return res.status(500).json({
      status: 500,
      message: "Error while logging in",
      error: err
    });
  }
};





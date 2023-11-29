const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
    

  try {
    const token = req.headers.authorization
  
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Login to access this resource",
      });
    }

   
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode._id);
   
    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

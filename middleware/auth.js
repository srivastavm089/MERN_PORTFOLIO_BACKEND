const User = require('../model/userModel');
const jwt = require('jsonwebtoken');


exports.isAuthenticated = async(req, res,next)=>{
  console.log("this")

    try {

        const token = req.cookies.token;
        if(!token){
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
      console.log("error")
        return res.status(400).json({
            success: false,
            message: error.message,
          });
    }
}




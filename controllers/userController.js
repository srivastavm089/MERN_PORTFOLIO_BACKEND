const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
exports.login = async (req, res) => {
   
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).cookie("token", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true,
      secure: true,
    });
    res.json({
      success: true,
      message: "Logged in Successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    res.status(200).cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
    });
    res.json({
      success: true,
      message: "Logged Out Successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-email -password");
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

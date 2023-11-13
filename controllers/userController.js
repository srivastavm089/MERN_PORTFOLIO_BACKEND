const { error } = require("console");
const cloudinary = require("cloudinary");
const { sendMail } = require("../middleware/sendMail");
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
exports.contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userMessage = `Hey, I am ${name}. My email is ${email}. My message is ${message}.`;
    await sendMail(userMessage);
    return res.status(200).json({
      success: true,
      message: "Message send Successfully ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.update = async (req, res) => {
  try {
    console.log("starting");
    const user = await User.findById(req.user._id);

    const { name, email, password, skills, about } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    if (skills) {
      if (skills.image1) {
        await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
          folder: "portfolio",
        });
        user.skills.image1 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image2) {
        await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
          folder: "portfolio",
        });
        user.skills.image2 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image3) {
        await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
          folder: "portfolio",
        });
        user.skills.image3 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image4) {
        await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
          folder: "portfolio",
        });
        user.skills.image4 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image5) {
        await cloudinary.v2.uploader.destroy(user.skills.image5.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
          folder: "portfolio",
        });
        user.skills.image5 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (skills.image6) {
        await cloudinary.v2.uploader.destroy(user.skills.image6.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
          folder: "portfolio",
        });
        user.skills.image6 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }

    if (about) {
      if (about.name) user.about.name = about.name;
      if (about.title) user.about.title = about.title;
      if (about.subtitle) user.about.subtitle = about.subtitle;
      if (about.description) user.about.description = about.description;
      if (about.quote) user.about.quote = about.quote;

      if (about.avatar) {
        await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);
        const { avatar } = about;
        console.log("right here");
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "portfolio",
        });
        console.log(myCloud.public_id);

        user.about.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }
    console.log("finish");
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.addTimeLine = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    console.log(date)
    const user = await User.findById(req.user._id);

    user.timeline.unshift({
      title,
      description,
      date,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "added to timeline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.addProject = async (req, res) => {
  console.log(req.body);
  try {
    const { url, title, image, description, techStack } = req.body;

    const user = await User.findById(req.user._id);
    const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: "portfolio",
    });
    user.projects.unshift({
      url,
      title,
      description,
      techStack,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();
    res.status(200).json({
      success: true,
      message: "added to projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteTimeLine = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findById(req.user._id);

    user.timeline = user.timeline.filter((item) => {
      return item._id != id;
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deleted from timeline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteProject = async (req, res) => {
  console.log("delete Project");
  try {
    const { id } = req.params;

    const user = await User.findById(req.user._id);
    console.log(id);
    const project = user.projects.filter((item) => item._id == id);
    console.log(project);
    await cloudinary.v2.uploader.destroy(project[0].image.public_id);
    user.projects = user.projects.filter((item) => {
      return item._id != id;
    });

    await user.save();
    res.status(200).json({
      success: true,
      message: "Deleted from projects",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

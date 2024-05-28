const User = require("../Model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const moment = require("moment/moment");
dotenv.config();
const cloudinary = require("cloudinary");
const Todo = require("../Model/todoModel");


const signToken = (userId) => {
  return jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: "72h" });
};


exports.getAndProtectUser = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "You are not logged in Please log in to get access",
      });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(401).json({
        status: "error",
        message: "The user belonging to this token does not exist.",
      });
    }

    if (
      currentUser.passwordUpdatedAt &&
      currentUser.passwordUpdatedAt.getTime() / 1000 > decoded.iat
    ) {
      return res.status(401).json({
        status: "error",
        message: "User recently changed their password. Please log in again.",
      });
    }

    req.user = currentUser;
    req.userId = currentUser._id;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.Register = async (req, res) => {
  try {
    const localTime = moment();
    const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");
    const { userName, password, confirmPassword, email, phoneNo, gender } =
      req.body;

    if (
      !userName ||
      !password ||
      !email ||
      !gender ||
      !confirmPassword ||
      !phoneNo
    ) {
      return res.status(400).json({
        status: "error",
        message: "Please fill all the fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }

    const newUser = new User({
      userName,
      password,
      email,
      phoneNo,
      gender,
      createdAt: newTime,
    });

    await newUser.save();

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const user = await User.findOne({ email: email }).select("+password");

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match",
      });
    }

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User does not exist with this email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials, Password does not match",
      });
    }

    const token = signToken({ userId: user._id });

    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      userId: user._id,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;

    const userId = req.userId;

    const user = await User.findById(userId);

    //const user = await User.findOne({email:email}).select("+password");

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User does not exist with this email address",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match",
      });
    }

    user.password = newPassword;
    user.passwordUpdatedAt = newTime;

    await user.save();

    const token = signToken({ userId: user._id });

    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
      userId: user._id,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const localTime = moment();
    const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");
    const { email, newPassword, confirmPassword, oldPassword } = req.body;

    if (!email || !newPassword || confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Please fill all the fields included email or first login",
      });
    }

    const userId = req.userId;
    const user = await User.findById(userId).select("+email password");
    //console.log('email', user.email);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User does not found",
      });
    }
    if (email !== user.email) {
      return res.status(400).json({
        status: "error",
        message: "User does not exist with this email address",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "error",
        message: "Invalid credentials, Old Password does not match",
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        status: "error",
        message: "Passwords do not match",
      });
    }

    user.password = newPassword;
    user.passwordUpdatedAt = newTime;

    await user.save();

    const token = signToken({ userId: user._id });
    return res.status(200).json({
      status: "success",
      message: "Password updated successfully",
      userId: user._id,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const { email, userName, phoneNo, gender, password } = req.body;

    const userId = req.userId;
    const user = await User.findById(userId).select("password email");

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User does not exist",
      });
    }

    if (email) {
      const existing_user = await User.findOne({ email });

      if (existing_user && existing_user._id.toString() !== userId) {
        return res.status(400).json({
          status: "error",
          message: "Email already use by another user",
        });
      }
      if (!password) {
        return res.status(400).json({
          status: "error",
          message: "Password is required to update email",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          status: "error",
          message: "Invalid credentials, Password does not match",
        });
      }
      user.email = email;
    }
    // if (userName || gender || phoneNo) {
    //   user.userName = userName;
    //   user.gender = gender;
    //   user.phoneNo = phoneNo;
    // }
    if (userName !== undefined) {
      user.userName = userName;
    }
    if (gender !== undefined) {
      user.gender = gender;
    }
    if (phoneNo !== undefined) {
      user.phoneNo = phoneNo;
    }
    if (req.files && req.files.images) {
      let images = Array.isArray(req.files.images)
        ? req.files.images
        : [req.files.images];
      let imagesLink = [];

      for (let image of images) {
        const result = await cloudinary.uploader.upload(image.tempFilePath, {
          folder: "User_Avatar",
        });
        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      user.images = imagesLink;
    }

    await user.save();

    let token = null;

    if (email) {
      token = signToken({ userId: user._id });
    }

    return res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const localTime = moment();
    const newTime = localTime.format("YYYY-MM-DD HH:mm:ss");
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "User does not exist",
      });
    }

    const tasks = await Todo.find({ user: userId });

    const today = moment().startOf('day');

    const currentTask = tasks.filter(
      (task) => moment(task.createdAt).isAfter(today) && !task.deleted && !task.completed
    );
    const completedTask = tasks.filter(
      (task) => task.completed && !task.deleted
    );
    const deletedTaskCount = user.noOfDeletedTask;

    const updatedTaskCount = tasks.filter((task) => moment(task.updatedAt).isAfter(today) && !task.deleted && !task.completed);

    return res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      data: {
        user,
        tasks,
        tasksCount: {
          currentTask: currentTask.length,
          completedTask: completedTask.length,
          deletedTask: deletedTaskCount,
          updatedTask: updatedTaskCount.length,
          
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

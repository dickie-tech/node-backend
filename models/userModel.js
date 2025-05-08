const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: [true, "Please enter username"],
  },
  email:{
    type: String,
    required: [true, "Please enter user email"],
    unique: [true, "Email address already exists"],
  },
  password: { type: String, required: true},
},{
    timestamps: true,
  });

  const User = mongoose.model("User", userSchema);

  module.exports = User;
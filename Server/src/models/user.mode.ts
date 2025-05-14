import bcrypt from "bcrypt";
import mongoose from "mongoose";

//=====================================================================================================================//
//  USER SCHEMA
//=====================================================================================================================//
// This is the schema for the user model. It defines the structure of the user document in the database.
// It also contains validation for the user input.
//=====================================================================================================================//
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [30, "Name must be at most 30 characters long"],
    match: [ /^[a-zA-Z]+$/, "Name must contain only letters." ],
    set: (val: string) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()

  },
  username: {
    type: String,
    required: true,
    unique: true,
    match: [ /^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers." ],
  },
  bio: {
    type: String,
    default: "",
    maxlength: [100, "Bio must be at most 100 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address."],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [6, "Password must be at least 6 characters long"],
    match: [ /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character." ],
  },
  profilePicture: {
    type: String,
    default: "",
    match: [ /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/, "Please provide a valid image URL." ],
  },
  coverPicture: {
    type: String,
    default: "",
    match: [ /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/, "Please provide a valid image URL." ],
  },
  role: {
    enum: ["admin", "user"],
    type: String,
    default: "user",
    required: true,
  },
  socketId: {
    type: String,
    default: "",
  },
  isBanned: {
    type: Boolean,
    default: false,
    date: {
      type: Date,
      default: null,
    },
    reason: {
      type: String,
      default: "",
    },
    bannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    unbannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    unbannedDate: {
      type: Date,
      default: null,
    },
  },
  isDeleted: {
    type: Boolean,
    default: false,
    date: {
      type: Date,
      default: null,
    },
    reason: {
      type: String,
      default: "",
    },
  },
}, { timestamps: true });

//=====================================================================================================================//
//  HASH PASSWORD
//=====================================================================================================================//
// This function hashes the password before saving the user to the database, but only if the password has been changed.
//=====================================================================================================================//
userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

//=====================================================================================================================//
//  COMPARE PASSWORD
//=====================================================================================================================//
// This function compares the password with the hashed password in the database.
//=====================================================================================================================//
userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)   
}

const userModel = mongoose.model("User", userSchema);

export default userModel;
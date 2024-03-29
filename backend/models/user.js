const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
      },
      books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        default: []
      }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
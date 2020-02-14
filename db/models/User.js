const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  googleId: String,
  fullName: {
    type: String,
    default: "Anonymous User"
  },
  firstName: String,
  lastName: String,
  emails: [String],
  subscribedLists: [{type: Schema.Types.ObjectId, ref: "List"}],
  managedLists: [{type: Schema.Types.ObjectId, ref: "List"}]
});

mongoose.model("users", userSchema);

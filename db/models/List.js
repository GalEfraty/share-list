const mongoose = require("mongoose");
const User = mongoose.model("users");

const { Schema } = mongoose;
const listSchema = new Schema(
  {
    listName: String,
    subscribedUsers: [
      {
        user: { type: Schema.Types.ObjectId, ref: User },
        manager: Boolean
      }
    ],
    items: [
      {
        itemName: {
          type: String,
          required: true
        },
        category: String,
        addedBy: { type: Schema.Types.ObjectId, ref: User },
        checked: {
          type: Boolean,
          default: false
        }
      }
    ]
  },
  { timestamps: true }
);

mongoose.model("lists", listSchema);

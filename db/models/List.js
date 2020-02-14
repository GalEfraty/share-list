const mongoose = require("mongoose");

const { Schema } = mongoose;
const listSchema = new Schema(
  {
    listName: String,
    subscribedUsers: [{type: Schema.Types.ObjectId, ref: "User"}],
    managers: [{type: Schema.Types.ObjectId, ref: "User"}],
    items: [
      {
        itemName: {
          type: String,
          required: true
        },
        category: String,
        addedBy: String,
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

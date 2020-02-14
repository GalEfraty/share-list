const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const List = mongoose.model("lists");
const User = mongoose.model("users");

module.exports = app => {
  //GET// getuserslistsoverview:
  app.get("/api/getuserslistsoverview", requireLogin, async (req, res) => {
    const subscribedListsIds = req.user.subscribedLists;
    let listsNamesAndIds = [];

    try {
      if (subscribedListsIds) {
        for (let listId of subscribedListsIds) {
          const { listName } = await List.findById(listId, {
            listName: 1,
            _id: 0
          });

          listsNamesAndIds.push({ listId, listName });
        }
      }
    } catch (error) {
      console.log("error at getuserslistsoverview: ", error);
      res.status(400).send({ error: "unable to find user lists" });
    }
    res.status(200).send(listsNamesAndIds);
  });

  //POST// createList
  app.post("/api/createList", requireLogin, async (req, res) => {
    try {
      const newList = await new List({
        listName: req.body.listName,
        managers: [req.user._id],
        subscribedUsers: [req.user._id]
      });
      req.user.managedLists.push(newList.id)
      req.user.subscribedLists.push(newList._id);

      await req.user.save();
      await newList.save();
      res.status(201).send(newList);
    } catch (error) {
      res.status(400).send({ error: "unable to create new list" });
    }
  });

  //GET// getListData
  app.get("/api/getListDate/:listId", requireLogin, async (req, res) => {
    try {
      const listData = await List.findById(req.params.listId);
      res.status(200).send(listData);
    } catch (error) {
      console.log("error in getListDate: " + error);
      res.status(400).send({ error: "unable to find list data" });
    }
  });

  //POST// addListItem
  app.post("/api/additem", requireLogin, async (req, res) => {
    const listId = req.body.listId;
    const newItem = {
      itemName: req.body.itemName,
      category: req.body.itemCategory,
      addedBy: req.user._id
    };
    try {
      await List.findByIdAndUpdate(listId, {
        $push: { items: newItem }
      });
      res.status(201).send({ message: "created" });
    } catch (error) {
      console.log("error in addItem: ", error);
      res.status(400).send({ error: "unable to add item" });
    }
  });

  //DELETE// RemoveListItem
  app.delete(
    "/api/removeitem/:itemId/:listId",
    requireLogin,
    async (req, res) => {
      const { itemId, listId } = req.params;
      try {
        await List.findByIdAndUpdate(listId, {
          $pull: { items: { _id: itemId } }
        });
        res.status(204).send({ message: "item removed" });
      } catch (error) {
        console.log("error in removeitem: " + error);
        res.status(400).send({ error: "unable to remove item" });
      }
    }
  );

  //PUT// checkItem
  app.put(
    "/api/checklistitem/:listId/:itemId/:checked",
    requireLogin,
    async (req, res) => {
      const { listId, itemId, checked } = req.params;
      try {
        await List.updateOne(
          { "items._id": itemId },
          { $set: { "items.$.checked": checked } }
        );
        res.status(204).send({ message: "item updated" });
      } catch (error) {
        console.log("error in checkItem: " + error);
        res.status(400).send({ error: "unable to check item" });
      }
    }
  );

  //POST// getusernamebyid
  app.post("/api/getsubscribedusers", requireLogin, async (req, res) => {
    const { userIds } = req.body;
    let subscribedUsers = [];
    try {
      for (let userId of userIds) {
        const result = await User.findById(userId);
        subscribedUsers.push(result);
      }
      res.status(200).send({ subscribedUsers: subscribedUsers });
    } catch (error) {
      console.log("error in getuserbyid, unable to find user", error);
      res
        .status(400)
        .send({ error: "error in getuserbyid, unable to find user" });
    }
  });

  //DELETE// removeList
  

  //DELETE// removeUserFromList
};

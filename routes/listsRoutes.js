const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const List = mongoose.model("lists");
const User = mongoose.model("users");
const { sendShareMail } = require("../services/email/mailer");

module.exports = app => {
  //GET// getSubscribedListsNames
  app.get("/api/getSubscribedListsNames", requireLogin, async (req, res) => {
    try {
      const lists = await List.find(
        { "subscribedUsers.user": req.user._id },
        "listName"
      );
      res.status(200).send({ lists });
    } catch (error) {
      console.log("error in getSubscribedListsNames: ", error);
      res.status(400).send({ error: "unable to getSubscribedListsNames" });
    }
  });

  //POST// createList
  app.post("/api/createList", requireLogin, async (req, res) => {
    try {
      const newList = await new List({
        subscribedUsers: [{ user: req.user, manager: true }],
        listName: req.body.newListName
      });
      await newList.save();
      res.status(201).send(newList);
    } catch (error) {
      console.log("error in createList: ", error);
      res.status(400).send({ error: "unable to createList" });
    }
  });

  //getListById
  app.get("/api/getListById/:id", requireLogin, async (req, res) => {
    try {
      const list = await List.findById(req.params.id);

      let isRequestedUserSubscribedToList = false;
      for (let subscribedUser of list.subscribedUsers) {
        if (subscribedUser.user.toString() == req.user._id) {
          isRequestedUserSubscribedToList = true;
        }
      }
      if (isRequestedUserSubscribedToList) {
        return res.status(200).send(list);
      }

      return res.status(401).send({ error: "unsubscribedUser" });
    } catch (error) {
      console.log("error in getListById: ", error);
      res.status(400).send({ error: "unable to getListById" });
    }
  });

  //POST// addListItem
  app.post("/api/additem", requireLogin, async (req, res) => {
    const listId = req.body.listId;
    const item = {
      _id: new mongoose.Types.ObjectId(),
      itemName: req.body.itemName,
      category: req.body.itemCategory,
      addedBy: req.user._id
    };
    try {
      await List.findByIdAndUpdate(listId, {
        $push: { items: item }
      });
      res.status(201).send(item);
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

  //POST// shareListViaEmail
  app.post("/api/shareListViaEmail", requireLogin, (req, res) => {
    const fullNameFrom = req.user.fullName;
    const emailFrom = req.user.emails[0];
    const { emailTo, listLink } = req.body;
    if (fullNameFrom && emailFrom && emailTo && listLink) {
      sendShareMail(fullNameFrom, listLink, emailFrom, emailTo);
      res.status(200).send({ msg: "email sent!" });
    } else {
      res.status(400).send({ error: "unable to send email" });
    }
  });

  // GET// getSubscribedUsers
  app.get("/api/getSubscribedUsers/:listId", requireLogin, async (req, res) => {
    try {
      const subscribedUsers = await List.findById(
        req.params.listId,
        "subscribedUsers"
      ).populate("subscribedUsers.user");
      res.status(200).send(subscribedUsers);
    } catch (error) {
      console.log("error in getSubscribedUsers: " + error);
      res.status(400).send({ error: "unable to get Subscribed Users" });
    }
  });

  //POST// unsubscribeUserFromList
  app.post("/api/unsubscribeUserFromList", requireLogin, (req, res) => {
    const { userIdToUnsubscribe, listId } = req.body;
    List.findByIdAndUpdate(listId, {
      $pull: { subscribedUsers: { user: { _id: userIdToUnsubscribe } } }
    })
      .then(() => {
        res
          .status(200)
          .send({ msg: "unsubscribed user from list successfully" });
      })
      .catch(error => {
        console.log("error in unsubscribeUserFromList: " + error);
        res.status(400).send({ error: "unable to unsubscribe User From List" });
      });
  });

  //POST// removeList
  app.post("/api/deleteList", requireLogin, (req, res) => {
    List.findByIdAndRemove(req.body.listIdToDelete)
      .then(() => {
        res.status(200).send({ msg: "list removed" });
      })
      .catch(error => {
        console.log("error in removeList: ", error);
        res.status(400).send({ error: "unable to delete list" });
      });
  });

  //POST// subscribeUserToList
  app.post("/api/subscribeUserToList", requireLogin, async (req, res) => {
    const { listId } = req.body;
    const userId = req.user._id;
    let isAlreadySubscribed = false;

    try {
      const list = await List.findById(listId);
      list.subscribedUsers.forEach(subscribedUser => {
        if (subscribedUser.user.toString() === userId.toString()) {
          return (isAlreadySubscribed = true);
        }
      });
      if (isAlreadySubscribed) {
        return res.status(400).send({ error: "already subscribed" });
      }

      if (!isAlreadySubscribed) {
        list.subscribedUsers.push({
          manager: false,
          _id: new mongoose.Types.ObjectId(),
          user: req.user._id
        });
        await list.save();
        res.status(200).send({ msg: "user subscribed" });
      }
    } catch (error) {
      console.log("error in subscribeUserToList: ", error);
      res.status(400).send("unable to subscribe User To List");
    }
  });

  //POST// makeUserManager
  app.post("/api/makeUserManager", requireLogin, async (req, res) => {
    const { listId, userId } = req.body;
    try {
      const list = await List.findById(listId);
      list.subscribedUsers.forEach(subscribedUser => {
        if (subscribedUser.user === userId) {
          subscribedUser.manager = true;
        }
      });
      await list.save();
      res.status(200).send({ msg: "user is now manager" });
    } catch (error) {
      console.log("error in makeUserManager: ", error);
      res.send({ error: "unable to make user manager" });
    }
  });

  //GET //getListNameById
  app.get("/api/getListNameById/:listId", (req, res) => {
    List.findById(req.params.listId, "listName")
      .then(result => {
        res.status(200).send(result);
      })
      .catch(error => {
        console.log("error in getListNameById: ", error);
        res.status(400).send({ error: "unable to get list name by id" });
      });
  });
  //GET // getUserNameById
  app.get("/api/getUserFullNameById/:userId", (req, res) => {
    User.findById(req.params.userId, "fullName")
      .then(result => {
        res.status(200).send(result);
      })
      .catch(error => {
        console.log("error in getUserFullNameById: ", error);
        res.status(400).send({ error: "unable to get user full name by id" });
      });
  });
};

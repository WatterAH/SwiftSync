import { supabase } from "../db/connection.js";
import { getFriendsById, getUserByID } from "../db/searchById.js";
import { updateFrienshipsById } from "../db/update.js";

export const searchFriend = async (req, res) => {
  try {
    const { username } = req.query;
    if (username.length <= 1) {
      return res.status(200).json("");
    }
    const { data: usersFound, error: errorConsult } = await supabase
      .from("usuarios")
      .select("id, username, icon")
      .ilike("username", `${username}%`);
    if (errorConsult) {
      return res.status(500).json({ message: "Error while querying" });
    } else {
      return res.status(200).json(usersFound);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchProfileById = async (req, res) => {
  try {
    const { id, me } = req.query;
    const { data: user, error: profileError } = await getUserByID(id);
    if (id == me) {
      delete user.notifications;
      delete user.friends;
      return res.status(200).json(user);
    }
    const { data: myData, error: myError } = await getUserByID(me);
    if (profileError || myError) {
      return res.status(400).json({ message: "This user does not exists" });
    }

    user.sentFriendRequest = user.notifications.some(
      (notification) => notification.req == me
    );
    user.receivedFriendRequest = myData.notifications.some(
      (notification) => notification.req == id
    );
    user.isFriend = myData.friends.some(
      (frienship) => frienship.friend_id == id
    );

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteFriendById = async (req, res) => {
  try {
    const { id, me } = req.body;
    let { data: userFriends, error: errorUser } = await getFriendsById(id);
    let { data: myFriends, error: myError } = await getFriendsById(me);
    if (errorUser || myError) {
      return res.status(500).json({ message: "Cannot delete friend" });
    } else {
      userFriends = userFriends.filter(
        (frienship) => frienship.friend_id != me
      );
      myFriends = myFriends.filter((frienship) => frienship.friend_id != id);
      await updateFrienshipsById(id, userFriends);
      await updateFrienshipsById(me, myFriends);
      return res.status(200).json({ message: "Deleted" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

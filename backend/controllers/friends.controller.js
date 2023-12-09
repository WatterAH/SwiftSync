import { supabase } from "../db/connection.js";
import {
  getFriendsById,
  getNotificationsById,
  getUserByID,
} from "../db/searchById.js";
import { updateFrienshipsById, updateNotificationsById } from "../db/update.js";
import { getDate } from "../libs/date.js";

export const sendFriendRequest = async (req, res) => {
  try {
    const { friendRequesterName, friendRequesterId, friendResponserId } =
      req.body;
    const { data, errorConsult } = await getNotificationsById(
      friendResponserId
    );

    if (errorConsult) {
      return res.status(500).json({ message: "Error sending friend request" });
    } else {
      const noty = {
        type: "friendReq",
        from: friendRequesterName,
        message: `sent you a friend request`,
        status: "unread",
        req: friendRequesterId,
        res: friendResponserId,
      };

      const { error: errorUpdate } = await updateNotificationsById(
        friendResponserId,
        [...data, noty]
      );

      if (errorUpdate) {
        return res
          .status(400)
          .json({ message: "Error sending friend request" });
      } else {
        return res.status(200).json({ message: "Sent" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const cancelFriendRequest = async (req, res) => {
  try {
    const { id, me } = req.body;
    const { data, errorConsult } = await getNotificationsById(id);
    if (errorConsult) {
      return res.status(400).json({ message: "Error canceling" });
    } else {
      const notifications = data.filter(
        (notification) => notification.req !== me
      );
      const { errorUpdate } = await updateNotificationsById(id, notifications);

      if (errorUpdate) {
        return res
          .status(400)
          .json({ message: "Error canceling friend request" });
      } else {
        return res.status(200).json({ message: "Friend request cancelled" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const { id, me } = req.body;
    const { data, errorConsult } = await getNotificationsById(me);
    if (errorConsult) {
      return res.status(500).json({ message: "Error when rejecting" });
    } else {
      const notifications = data.filter(
        (notification) => notification.req != id
      );

      const { errorUpdate } = await updateNotificationsById(me, notifications);

      if (errorUpdate) {
        return res.status(500).json({ message: "Error when rejecting" });
      } else {
        return res.status(200).json({ message: "Rejected" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id, me } = req.body;

    const { data: myData, error: myError } = await getUserByID(me);
    const { data: userData, error: userErr } = await getUserByID(id);
    if (myError || userErr) {
      return res.status(500).json({ message: "Error accepting request" });
    }

    const date = getDate();
    const friendship = {
      date,
    };

    friendship.friend_id = id;
    friendship.username = userData.username;
    friendship.icon = userData.icon;
    await updateFrienshipsById(me, [...myData.friends, friendship]);
    friendship.friend_id = me;
    friendship.username = myData.username;
    friendship.icon = myData.icon;
    await updateFrienshipsById(id, [...userData.friends, friendship]);

    const newNotifications = myData.notifications.filter(
      (notification) => notification.req != id
    );

    const { errorUpdate } = await updateNotificationsById(me, newNotifications);
    if (errorUpdate) {
      return res.status(500).json({
        message:
          "The friendship is established, there was a problem deleting the notification",
      });
    }
    return res.status(200).json({ message: "A new SwiftFriend!" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

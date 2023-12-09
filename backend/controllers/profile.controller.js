import { getFriendsById, getNotificationsById } from "../db/searchById.js";

export const myNotifications = async (req, res) => {
  try {
    const { id } = req.query;
    const { data, errorConsult } = await getNotificationsById(id);
    if (errorConsult) {
      return res.status(500).json({ message: "Error getting notifications" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const myFriends = async (req, res) => {
  try {
    const { id } = req.query;
    const { data, error } = await getFriendsById(id);
    if (error) {
      return res.status(500).json({ message: "Error getting friends" });
    } else {
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

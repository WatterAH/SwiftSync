import { supabase } from "../db/connection.js";

export const addUser = async (req, res) => {
  try {
    const { friendRequesterName, friendRequesterId, friendResponserId } =
      req.body;
    const { data: notificaciones, error: errorConsult } = await supabase
      .from("notificaciones")
      .select("notifications")
      .eq("id_user", friendResponserId)
      .single();
    if (errorConsult) {
      const noty = [
        {
          type: "friendReq",
          message: `${friendRequesterName} sent you a friend request`,
          status: "unread",
          req: friendRequesterId,
        },
      ];
      const { error } = await supabase
        .from("notificaciones")
        .upsert([{ id_user: friendResponserId, notifications: noty }], {
          onConflict: ["id_user"],
        });
      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json({ message: "Sent" });
      }
    } else {
      const noty = {
        type: "friendReq",
        message: `${friendRequesterName} sent you a friend request`,
        status: "unread",
        req: friendRequesterId,
      };

      const existingNotifications = notificaciones.notifications || [];
      const updatedNotifications = [...existingNotifications, noty];

      const { error } = await supabase
        .from("notificaciones")
        .update({ notifications: updatedNotifications })
        .eq("id_user", friendResponserId);

      if (error) {
        return res.status(400).json(error);
      } else {
        return res.status(200).json({ message: "Sent" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "The server has encountered a problem." });
  }
};

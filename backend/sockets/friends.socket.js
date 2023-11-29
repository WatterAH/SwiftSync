import { supabase } from "../db/connection.js";

export const addUser = (socket, io) => {
  socket.on("addUser", async (dataClient) => {
    // const { data } = await supabase
    //   .from("notifications")
    //   .select("notifications")
    //   .eq("id_user", dataClient.theirID)
    //   .single();
    // const existingNotifications = data.notifications || [];
    // const notify = {
    //   type: "friend_req",
    //   desc: `${dataClient.myName} sent you a friend request`,
    // };
    // const updatedNotifications = [...existingNotifications, notify];
    // const { data: updatedData, error } = await supabase
    //   .from("notificaciones")
    //   .update({ notifications: updatedNotifications })
    //   .eq("id_user", dataClient.theirID)
    //   .select();
    // if (error) {
    //   console.log(error);
    // }
    // socket.emit("");
  });
};

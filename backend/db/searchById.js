import { supabase } from "./connection.js";

export const getUserByID = async (userID) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("id, username, icon, description, notifications, friends")
    .eq("id", userID)
    .single();
  return { data, error };
};

export const getNotificationsById = async (userID) => {
  const { data, error: errorConsult } = await supabase
    .from("usuarios")
    .select("notifications")
    .eq("id", userID)
    .single();

  return { data: data.notifications || [], errorConsult };
};

export const getFriendsById = async (userID) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("friends")
    .eq("id", userID)
    .single();

  return { data: data.friends || [], error };
};

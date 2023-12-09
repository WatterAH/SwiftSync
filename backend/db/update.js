import { supabase } from "./connection.js";

export const updateNotificationsById = async (id, notifications) => {
  const { error: errorUpdate } = await supabase
    .from("usuarios")
    .update({ notifications })
    .eq("id", id);

  return { errorUpdate };
};

export const updateFrienshipsById = async (id, friends) => {
  const { error } = await supabase
    .from("usuarios")
    .update({ friends })
    .eq("id", id);
  if (error) {
    throw new Error("Error while updating");
  }
};

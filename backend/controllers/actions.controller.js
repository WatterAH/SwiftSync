import { supabase } from "../db/connection.js";

export const searchFriend = async (req, res) => {
  try {
    const { username } = req.query;
    if (username.length <= 1) {
      return res.status(200).json("");
    }
    const { data: usuarios, error } = await supabase
      .from("usuarios")
      .select("*")
      .ilike("username", `${username}%`);
    if (error) {
      return res.status(500).json({ message: error });
    } else {
      return res.status(200).json(usuarios);
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const searchProfile = async (req, res) => {
  try {
    const { id } = req.query;
    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      return res.status(403).json({ message: "No user found" });
    } else {
      return res.status(200).json(usuario);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "The server has encountered a problem." });
  }
};

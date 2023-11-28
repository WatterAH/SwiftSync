import { supabase } from "../db/connection.js";
import { createAccessToken } from "../libs/tokens.lib.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
  const { username, password, selectedIcon } = req.body;
  if (!username || !password || !selectedIcon) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const passHaash = await bcryptjs.hash(password, 8);
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([
        {
          username: username,
          password: passHaash,
          icon: selectedIcon,
        },
      ])
      .select();
    if (error) {
      return res.status(403).json({ message: "Username already exists." });
    } else {
      return res.status(200).json({ data, message: "User registered." });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "The server has encountered a problem." });
  }
};

export const auth = async (req, res) => {
  const { username, password } = req.body;
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("username", username)
    .single();
  if (error) {
    return res.status(403).json({ message: "Verify your credentials" });
  } else {
    if (!(await bcryptjs.compare(password, data.password))) {
      return res.status(403).json({ message: "Verify your credentials." });
    } else {
      const usuario = { id: data.id, username: data.username, icon: data.icon };
      const token = await createAccessToken(usuario);
      res.cookie("token", token, {
        maxAge: 315360000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return res.status(200).json(usuario);
    }
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    maxAge: new Date(),
    sameSite: "None",
  });
  return res.status(200).json({ message: "OK" });
};

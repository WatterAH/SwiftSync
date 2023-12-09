import { supabase } from "../db/connection.js";
import { createAccessToken } from "../libs/tokens.lib.js";
import bcryptjs from "bcryptjs";
import { isCorrectUsername, isStrongPassword } from "../libs/validator.lib.js";

export const register = async (req, res) => {
  try {
    const { username, password, selectedIcon } = req.body;
    if (!selectedIcon) {
      return res.status(400).json({ message: "Select an Icon" });
    } else if (!isCorrectUsername(username)) {
      return res.status(400).json({ message: "Invalid username" });
    } else if (!isStrongPassword(password)) {
      return res.status(400).json({ message: "Password is not strong" });
    }
    const passHaash = await bcryptjs.hash(password, 8);

    const { data: user, error } = await supabase.from("usuarios").insert([
      {
        username: username,
        password: passHaash,
        icon: selectedIcon,
      },
    ]);
    if (error) {
      return res.status(409).json({ message: "This username already exists" });
    } else {
      return res.status(200).json({ user, message: "User registered" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const auth = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { data: user, error: errorConsult } = await supabase
      .from("usuarios")
      .select("id, username, password, icon")
      .eq("username", username)
      .single();
    if (errorConsult) {
      return res.status(403).json({ message: "Verify your credentials" });
    } else {
      if (!(await bcryptjs.compare(password, user.password))) {
        return res.status(403).json({ message: "Verify your credentials." });
      } else {
        delete user.password;
        const token = await createAccessToken(user);
        res.cookie("token", token, {
          maxAge: 315360000,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        });
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "OK" });
};

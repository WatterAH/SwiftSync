import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

export const validateToken = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Debes iniciar sesion" });
  } else {
    jwt.verify(token, process.env.JWT_KEY, (err, usuario) => {
      if (err) {
        return res.status(403).json({ message: "Debes iniciar sesion" });
      } else {
        return res.status(200).json(usuario);
      }
    });
  }
};

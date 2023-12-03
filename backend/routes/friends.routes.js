import { Router } from "express";
import { addUser } from "../controllers/friends.controller.js";

export const friendsRouter = Router();

friendsRouter.put("/sendFriendRequest", addUser);

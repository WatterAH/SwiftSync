import { Router } from "express";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  declineFriendRequest,
  sendFriendRequest,
} from "../controllers/friends.controller.js";

export const friendsRouter = Router();

friendsRouter.put("/api/sendFriendRequest", sendFriendRequest);
friendsRouter.put("/api/cancelFriendRequest", cancelFriendRequest);
friendsRouter.put("/api/declineFriendRequest", declineFriendRequest);
friendsRouter.put("/api/acceptFriendRequest", acceptFriendRequest);

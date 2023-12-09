import { Router } from "express";
import {
  myFriends,
  myNotifications,
} from "../controllers/profile.controller.js";

export const profileRouter = Router();

profileRouter.get("/api/getNotifications", myNotifications);
profileRouter.get("/api/getFriends", myFriends);

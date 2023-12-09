import { Router } from "express";
import {
  deleteFriendById,
  searchFriend,
  searchProfileById,
} from "../controllers/actions.controller.js";

export const actionRouter = Router();

actionRouter.get("/api/searchFriend", searchFriend);
actionRouter.get("/api/searchProfileById", searchProfileById);
actionRouter.put("/api/deleteFriendById", deleteFriendById);

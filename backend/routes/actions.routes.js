import { Router } from "express";
import {
  searchFriend,
  searchProfile,
} from "../controllers/actions.controller.js";

export const actionRouter = Router();

actionRouter.get("/api/searchFriend", searchFriend);
actionRouter.get("/api/searchProfile", searchProfile);

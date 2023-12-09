import { Router } from "express";
import { auth, logout, register } from "../controllers/accounts.controller.js";
import { validateToken } from "../libs/tokens.lib.js";

export const accountRouter = Router();

accountRouter.post("/api/register", register);
accountRouter.post("/api/auth", auth);
accountRouter.post("/api/validateToken", validateToken);
accountRouter.post("/api/logout", logout);

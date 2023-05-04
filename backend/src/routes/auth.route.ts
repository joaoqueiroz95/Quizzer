import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { validateForm } from "../middleware/validateForm";

const router = Router();

router.post("/login", login);

export default router;

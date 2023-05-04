import { Router } from "express";
import { createUserSchema } from "../constants/schemas";
import { createOne } from "../controllers/users.controller";
import { validateForm } from "../middleware/validateForm";

const router = Router();

router.post("/", validateForm(createUserSchema), createOne);

export default router;

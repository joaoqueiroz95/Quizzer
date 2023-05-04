import { Router } from "express";
import { createQuizSchema, editQuizSchema } from "../constants/schemas";
import {
  getMany,
  createOne,
  getOne,
  getOnePublic,
  deleteOne,
  editOne,
  publish,
} from "../controllers/quizzes.controller";
import { isAuth } from "../middleware/auth";
import { validateForm } from "../middleware/validateForm";

const router = Router();

router.get("/", isAuth, getMany);

router.get("/:id", isAuth, getOne);

router.get("/take/:id", getOnePublic);

router.post("/", isAuth, validateForm(createQuizSchema), createOne);

router.post("/publish", isAuth, publish);

router.put("/:id", isAuth, validateForm(editQuizSchema), editOne);

router.delete("/:id", isAuth, deleteOne);

export default router;

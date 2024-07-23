import express from "express";
import { postController } from "../controller/provider.controller.js";

const router = express.Router();

router.get('/',postController);

export default router;
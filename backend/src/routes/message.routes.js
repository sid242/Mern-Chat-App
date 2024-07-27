import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";
const router = Router();

router.use(verifyJWT);

router.route("/:chatId").get(getAllMessages);
router.route("/").post(sendMessage);

export default router;

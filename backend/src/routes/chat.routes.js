import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  addRemoveUserFromGroup,
} from "../controllers/chat.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(accessChat).get(fetchChats);
router.route("/create-group").post(createGroup);
router.route("/rename-group").patch(renameGroup);
router.route("/add-remove-user-group/:option").put(addRemoveUserFromGroup);

export default router;

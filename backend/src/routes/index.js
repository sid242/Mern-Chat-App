import { Router } from "express";
import healthcheckRouter from "./healthcheck.routes.js";
import userRouter from "./user.routes.js";
import chatRouter from "./chat.routes.js";
import messageRouter from "./message.routes.js";

const router = Router();

router.use("/v1/healthcheck", healthcheckRouter);
router.use("/v1/user", userRouter);
router.use("/v1/chat", chatRouter);
router.use("/v1/message", messageRouter);

export default router;

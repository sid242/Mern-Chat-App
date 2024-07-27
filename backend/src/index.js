import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/index.js";
import { app } from "./app.js";
import socket from "./socket.io.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERRR: ", error);
      process.exit(1);
    });
    const server = app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
    socket(server);
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

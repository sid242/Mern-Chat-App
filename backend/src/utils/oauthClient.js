import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";
const { OAuth2 } = google.auth;

export const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

import { oauth2Client } from "./oauthClient.js";

export function authorizeClient(accessToken) {
  oauth2Client.setCredentials({ access_token: accessToken });
  return oauth2Client;
}

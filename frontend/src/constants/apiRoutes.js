export const userAuthRoutes = {
  REGISTER: "api/v1/user/register",
  LOGIN: "api/v1/user/login",
  LOGOUT: "api/v1/user/logout",
  CURRENT_USER: "api/v1/user/current-user",
  REFRESH_TOKEN: "api/v1/user/refresh-token",
  USERS: "api/v1/user",
};

export const chatRoutes = {
  ACCESS_CHAT: "api/v1/chat",
  CREATE_GROUP: "api/v1/chat/create-group",
  RENAME_GROUP: "api/v1/chat/rename-group",
  ADD_REMOVE_USER_GROUP: "api/v1/chat/add-remove-user-group",
  GET_MESSAGES: "/api/v1/message",
};

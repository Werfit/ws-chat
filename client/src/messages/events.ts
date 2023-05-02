const EventNames = {
  connection: "connection",
  disconnect: "disconnect",
  authorization: "authorization",
  logout: "logout",
  incomingMessage: "incoming-message",
  outgoingMessage: "outgoing-message",
  ownIncomingMessage: "own-incoming-message",
  messagesStatus: "messages-status",
  chatJoin: "chat-join",
  chatUsers: "chat-users",
  error: "error",
  connectionError: "connect_error",
} as const;

export { EventNames };

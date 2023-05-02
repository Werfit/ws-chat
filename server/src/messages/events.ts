const EventNames = {
  connection: "connection",
  disconnection: "disconnect",
  disconnecting: "disconnecting",
  authorization: "authorization",
  logout: "logout",
  incomingMessage: "incoming-message",
  outgoingMessage: "outgoing-message",
  ownIncomingMessage: "own-incoming-message",
  messagesStatus: "messages-status",
  chatJoin: "chat-join",
  chatUsers: "chat-users",
  error: "error",
} as const;

export { EventNames };

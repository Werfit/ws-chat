const EventNames = {
  connection: "connection",
  disconnect: "disconnect",
  authorization: "authorization",
  logout: "logout",
  incomingMessage: "incoming-message",
  outgoingMessage: "outgoing-message",
  ownIncomingMessage: "own-incoming-message",
  messagesStatus: "messages-status",
  error: "error",
} as const;

export { EventNames };

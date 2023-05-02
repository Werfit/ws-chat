import { createContext, useEffect, useState } from "react";
import { socket } from "@/sockets";
import { EventNames } from "@/messages/events";

type InitialState = {
  messages: Message[];
  users: User[];
  addMessage: (content: Message["content"]) => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

type Message = {
  content: string;
  username: string;
};

type User = {
  id: string;
  username: string;
};

const initialState: InitialState = {
  messages: [],
  users: [],
  addMessage: () => {},
};

const MessageContext = createContext<InitialState>(initialState);

let wasRendered = false;

const MessageProvider = ({ children }: ProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!wasRendered) {
      wasRendered = true;
      return;
    }

    socket.on(EventNames.messagesStatus, (data: Message[]) =>
      setMessages(data)
    );

    socket.on(EventNames.chatUsers, (users) => setUsers(users));

    socket.on(EventNames.chatJoin, (user) =>
      setUsers((users) => [...users, user])
    );

    socket.on(EventNames.ownIncomingMessage, (data: Message) =>
      setMessages((messages) => [...messages, data])
    );

    socket.on(EventNames.incomingMessage, (data: Message) =>
      setMessages((messages) => [...messages, data])
    );

    return () => {
      socket.off(EventNames.messagesStatus);
      socket.off(EventNames.ownIncomingMessage);
      socket.off(EventNames.incomingMessage);
    };
  }, []);

  const addMessage = (content: Message["content"]) =>
    socket.emit(EventNames.outgoingMessage, { content });

  return (
    <MessageContext.Provider value={{ messages, users, addMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };

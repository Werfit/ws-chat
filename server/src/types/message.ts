import { User } from "./user";

type Message = {
  content: string;
  username: User["username"];
};

export type { Message };

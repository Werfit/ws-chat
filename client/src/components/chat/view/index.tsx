import { HTMLAttributes, useEffect, useRef } from "react";
import { useContext } from "react";
import { IncomingMessage, OutgoingMessage } from "../messages";
import { MessageContext } from "@/store/messages";
import { AuthenticationContext } from "@/store/authentication";

type Props = HTMLAttributes<HTMLDivElement>;

const View = (props: Props) => {
  const { messages } = useContext(MessageContext);
  const { username } = useContext(AuthenticationContext);
  const viewArea = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewArea.current) {
      viewArea.current.scrollTo({
        top: viewArea.current?.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={viewArea}
      {...props}
    >
      {messages.map((message, index) =>
        message.username !== username ? (
          <IncomingMessage
            key={index}
            message={message.content}
            username={message.username}
          />
        ) : (
          <OutgoingMessage
            key={index}
            message={message.content}
          />
        )
      )}
    </div>
  );
};

export { View };

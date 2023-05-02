import { FormEvent, FormHTMLAttributes, useContext, useState } from "react";
import { MessageContext } from "@/store/messages";

type Props = FormHTMLAttributes<HTMLFormElement>;

const MessageForm = (props: Props) => {
  const { addMessage } = useContext(MessageContext);
  const [message, setMessage] = useState("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    addMessage(message);
    setMessage("");
  };

  return (
    <form
      {...props}
      onSubmit={submitHandler}
    >
      <input
        type="text"
        placeholder="Enter your message"
        spellCheck="false"
        autoComplete="off"
        className="grow border tracking-wide px-4 py-2 rounded border-gray-100 focus:border-sky-200 focus:ring-sky-200 focus:ring-1 focus:outline-none outline-sky-400 duration-300"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="px-4 py-2 tracking-wide border border-sky-400 bg-sky-400 text-white rounded-md hover:bg-white hover:border-sky-400 hover:text-sky-400 focus:ring-sky-300 duration-300 active:ring-1 focus-visible:outline-none"
      >
        Send
      </button>
    </form>
  );
};

export { MessageForm };

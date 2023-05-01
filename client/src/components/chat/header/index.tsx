import { HTMLAttributes, useContext } from "react";
import { AuthenticationContext } from "@/store/authentication";

type Props = HTMLAttributes<HTMLDivElement>;

const Header = (props: Props) => {
  const { username, roomId, logout } = useContext(AuthenticationContext);

  return (
    <div {...props}>
      <h4>{username}</h4>
      <h2 className="text-2xl text-gray-400">{roomId}</h2>
      <button
        className="border border-sky-400 text-sky-400 px-4 py-2 rounded-md hover:bg-sky-400 hover:text-white focus:ring-1 duration-300 tracking-wide focus-visible:outline-none"
        onClick={() => logout()}
      >
        Log out
      </button>
    </div>
  );
};

export { Header };

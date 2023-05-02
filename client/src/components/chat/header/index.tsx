import { HTMLAttributes, useContext } from "react";
import { AuthenticationContext } from "@/store/authentication";

type Props = HTMLAttributes<HTMLDivElement> & {
  onUsersListOpen: () => void;
};

const Header = ({ onUsersListOpen, ...props }: Props) => {
  const { username, roomId, logout } = useContext(AuthenticationContext);

  return (
    <div {...props}>
      <h4>{username}</h4>
      <h2 className="text-2xl text-gray-400">{roomId}</h2>

      <div className="flex gap-2">
        <button
          className="border bg-emerald-500 border-emerald-500 hover:text-emerald-500 px-4 py-2 rounded-md hover:bg-white text-white focus:ring-emerald-400 focus:ring-1 duration-300 tracking-wide focus-visible:outline-none"
          onClick={onUsersListOpen}
        >
          Users
        </button>
        <button
          className="border border-sky-400 text-sky-400 px-4 py-2 rounded-md hover:bg-sky-400 focus:ring-sky-300 hover:text-white focus:ring-1 duration-300 tracking-wide focus-visible:outline-none"
          onClick={() => logout()}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export { Header };

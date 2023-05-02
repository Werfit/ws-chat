import { useContext } from "react";
import { MessageContext } from "@/store/messages";

type Props = {
  onClose: () => void;
};

const Users = ({ onClose }: Props) => {
  const { users } = useContext(MessageContext);

  return (
    <div
      className="fixed grid h-screen place-items-center w-screen cursor-pointer bg-gradient-to-t from-gray-100 to-transparent"
      onClick={onClose}
    >
      <div
        className="w-1/6 max-h-[50%] bg-white rounded-md shadow-md shadow-gray-200 overflow-y-scroll flex flex-col z-10 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {users.map((user) => (
          <p
            className="w-full text-center px-4 py-4 tracking-widest odd:bg-gray-50"
            key={user.id}
          >
            {user.username}
          </p>
        ))}
      </div>
    </div>
  );
};
export { Users };

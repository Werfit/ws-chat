import { FormEvent, useContext, useState } from "react";
import { AuthenticationContext } from "@/store/authentication";

const Dialog = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

  const { authenticate } = useContext(AuthenticationContext);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    authenticate({
      roomId,
      username,
      isAuthenticated: true,
    });
  };

  return (
    <div className="fixed top-1/4 left-1/4 w-1/2 h-1/2 shadow-2xl shadow-gray-200 flex items-center justify-center bg-white rounded-md">
      <form
        className="w-1/2 flex flex-col gap-5"
        onSubmit={submitHandler}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="server-room-id">Room ID</label>
          <input
            type="text"
            placeholder="Room ID"
            id="server-room-id"
            autoComplete="off"
            spellCheck="false"
            className="border tracking-wide px-4 py-2 rounded border-gray-100 focus:border-sky-200 focus:ring-sky-200 focus:ring-1 focus:outline-none duration-300"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            autoComplete="off"
            spellCheck="false"
            className="border tracking-wide px-4 py-2 rounded border-gray-100 focus:border-sky-200 focus:ring-sky-200 focus:ring-1 focus:outline-none duration-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full border border-sky-400 text-lg tracking-wider bg-sky-400 py-3 text-white rounded-md hover:bg-white hover:border-sky-400 hover:text-sky-400 duration-300 active:ring-1 hover:shadow-md hover:shadow-sky-100"
        >
          Start
        </button>
      </form>
    </div>
  );
};

export { Dialog };

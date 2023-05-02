import { useState } from "react";

import { Header } from "./header";
import { MessageForm } from "./form";
import { View } from "./view";
import { Users } from "./users";

const Chat = () => {
  const [usersListVisible, setUsersListVisibility] = useState(false);

  return (
    <>
      {usersListVisible && (
        <Users onClose={() => setUsersListVisibility(false)} />
      )}

      <div className="flex flex-col w-3/4 h-3/4 bg-white shadow-2xl shadow-gray-200 rounded-md px-10 py-8 gap-3">
        <Header
          className="flex justify-between items-center font-bold tracking-widest"
          onUsersListOpen={() => setUsersListVisibility(true)}
        />

        <View className="flex flex-col grow gap-3 py-2 overflow-scroll" />
        <MessageForm className="flex justify-center items-stretch gap-3" />
      </div>
    </>
  );
};

export { Chat };

type Props = {
  message: string;
  username: string;
};

const IncomingMessage = ({ message, username }: Props) => (
  <div className="bg-gray-100 px-6 max-w-[83%] py-3 rounded-md flex flex-col gap-2 text-sm flex-shrink self-start">
    <h5 className="text-xs text-gray-500 font-bold tracking-wider">
      {username}
    </h5>
    <p className="text-sm">{message}</p>
  </div>
);

export { IncomingMessage };

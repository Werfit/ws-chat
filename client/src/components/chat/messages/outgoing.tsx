type Props = {
  message: string;
};

const OutgoingMessage = ({ message }: Props) => (
  <div className="bg-sky-100 px-6 py-3 max-w-[83%] self-end rounded-md text-sm">
    {message}
  </div>
);

export { OutgoingMessage };

import React from "react";

interface Props {
  connect: () => void;
}

const ConnectButton = ({ connect }: Props) => {
  return (
    <button
      className="bg-neutral-500 rounded-md my-5 w-full p-2 px-8"
      onClick={connect}
    >
      Connect Wallet
    </button>
  );
};

export default ConnectButton;

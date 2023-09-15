import React, { useEffect, useState } from "react";

const useConnect = () => {
  const [account, setAccount] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    checkIsWalletConnected();
  }, []);

  const checkIsWalletConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts.length !== 0) {
        // account = accounts[0];
        setAccount(accounts[0]);
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    account,
    setAccount,
    connectWallet,
    currentAccount,
    setCurrentAccount,
    checkIsWalletConnected,
  };
};

export default useConnect;

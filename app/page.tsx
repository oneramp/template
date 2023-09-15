"use client";

import useConnect from "@/hooks/useConnect";
import Image from "next/image";
import { useState } from "react";
import { OneRamp } from "@oneramp/sdk";
import ConnectButton from "./components/ConnectButton";
import { ethers } from "ethers";
import { RotatingSquare } from "react-loader-spinner";

const clientPub = "";
const secretKey = "";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>("");

  const [explorer, setExplorer] = useState("");

  const [amount, setAmount] = useState<HTMLInputElement | string>();
  const [phone, setPhone] = useState<HTMLInputElement | string>();
  const { connectWallet, currentAccount } = useConnect();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!amount || !phone) {
        alert("You need fill all fields");
        return;
      }

      const { ethereum } = window;

      const provider = new ethers.BrowserProvider(ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      const oneramp = new OneRamp(
        "mumbai",
        clientPub,
        secretKey,
        provider,
        signer
      );

      const result = await oneramp.offramp(
        "usdt",
        Number(amount),
        "256700719619"
      );

      if (result.success) {
        setLoading(false);
        setExplorer(
          `https://alfajores.celoscan.io/tx/${result.response.txHash}`
        );

        setAmount("");
        setPhone("");
      } else {
        setLoading(false);
        setError("Failed to make transaction");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-xl text-center font-bold">OffRamp - DApp</h1>

        <>
          {currentAccount ? (
            <div className="">
              <h1 className="text-sm text-blue-400 underline my-5">
                {currentAccount}{" "}
              </h1>

              <div className="flex flex-col">
                <input
                  type="number"
                  placeholder="0.0"
                  disabled={loading}
                  className="w-full bg-neutral-700 outline-none text-white p-3"
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  type="tel"
                  disabled={loading}
                  placeholder="Enter Phone"
                  className="w-full my-5 bg-neutral-700 outline-none text-white p-3"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <button
                  className={`${
                    loading ? "bg-neutral-300" : "bg-blue-700"
                  }  w-full p-3 rounded-md flex items-center justify-center`}
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <RotatingSquare
                      height="30"
                      width="30"
                      color="#fff"
                      ariaLabel="rotating-square-loading"
                      strokeWidth="4"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : (
                    "Off Ramp"
                  )}
                </button>
              </div>

              {explorer && (
                <a
                  href={explorer}
                  className="mt-4 text-sm text-center"
                  target="_blank"
                >
                  <p className="mt-4 text-green-400">View On Explorer</p>
                </a>
              )}
            </div>
          ) : (
            <ConnectButton connect={connectWallet} />
          )}
        </>
      </div>
    </main>
  );
}

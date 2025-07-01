import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);

      window.ethereum.request({ method: "eth_accounts" }).then(async (accounts) => {
        if (accounts.length > 0) {
          const signer = await ethProvider.getSigner();
          const network = await ethProvider.getNetwork();

          setProvider(ethProvider);
          setAddress(accounts[0]);
          setSigner(signer);
          setChainId(Number(network.chainId));
        }
      });

      window.ethereum.on("accountsChanged", async (accounts) => {
        if (accounts.length === 0) {
          setAddress(null);
          setSigner(null);
        } else {
          setAddress(accounts[0]);
          const signer = await provider.getSigner();
          setSigner(signer);
        }
      });

      window.ethereum.on("chainChanged", (_chainId) => {
        setChainId(Number(_chainId));
        window.location.reload(); // force reload untuk hindari error jaringan
      });
    }
  }, []);

  const connect = async () => {
    if (!window.ethereum) return alert("Install MetaMask dulu ya!");
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const ethProvider = new ethers.BrowserProvider(window.ethereum);
    const signer = await ethProvider.getSigner();
    const network = await ethProvider.getNetwork();

    setAddress(accounts[0]);
    setProvider(ethProvider);
    setSigner(signer);
    setChainId(Number(network.chainId));
  };

  return (
    <WalletContext.Provider value={{ address, provider, signer, chainId, connect }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}

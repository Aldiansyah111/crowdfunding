import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import contract from "./crowdfunding.json";
const abi = contract.abi;

import { useWallet } from "./wallet";

const CrowdfundingContext = createContext();

const contractAddress = "0xf8029a1b8Acb5cbFafB36F5e984ac0B771b93a2F"; // sesuaikan

export function CrowdfundingProvider({ children }) {
  const { provider, signer, address, isConnected } = useWallet();
  const [contract, setContract] = useState(null);
  const [tiers, setTiers] = useState([]);

  useEffect(() => {
    if (signer) {
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);
    }
  }, [signer]);

  const fetchTiers = async () => {
    if (!contract) return;
    try {
      const result = await contract.getTiers();
      setTiers(result);
    } catch (err) {
      console.error("Error fetching tiers:", err);
    }
  };

  const fund = async (tierIndex, amountInWei) => {
    if (!contract) return;
    try {
      const tx = await contract.fund(tierIndex, { value: amountInWei });
      await tx.wait();
      console.log("Funding success:", tx.hash);
    } catch (err) {
      console.error("Funding error:", err);
    }
  };

  const getBalance = async () => {
    if (!contract) return;
    try {
      const bal = await contract.getContractBalance();
      return bal.toString();
    } catch (err) {
      console.error("Get balance error:", err);
      return "0";
    }
  };

  const withdraw = async () => {
    if (!contract) return;
    try {
      const tx = await contract.withdraw();
      await tx.wait();
    } catch (err) {
      console.error("Withdraw error:", err);
    }
  };

  const refund = async () => {
    if (!contract) return;
    try {
      const tx = await contract.refund();
      await tx.wait();
    } catch (err) {
      console.error("Refund error:", err);
    }
  };

  const addTier = async (name, amount) => {
    if (!contract) return;
    try {
      const tx = await contract.addTier(name, amount);
      await tx.wait();
      fetchTiers(); // refresh list
    } catch (err) {
      console.error("Add tier error:", err);
    }
  };

  const togglePause = async () => {
    if (!contract) return;
    try {
      const tx = await contract.togglePause();
      await tx.wait();
    } catch (err) {
      console.error("Toggle pause error:", err);
    }
  };

  const extendDeadline = async (daysToAdd) => {
    if (!contract) return;
    try {
      const tx = await contract.extendDeadline(daysToAdd);
      await tx.wait();
    } catch (err) {
      console.error("Extend deadline error:", err);
    }
  };

  const getCampaignStatus = async () => {
    if (!contract) return;
    try {
      const status = await contract.getCampaignStatus();
      return status;
    } catch (err) {
      console.error("Get status error:", err);
      return null;
    }
  };

  useEffect(() => {
    if (contract) fetchTiers();
  }, [contract]);

  return (
    <CrowdfundingContext.Provider
      value={{
        tiers,
        fund,
        getBalance,
        withdraw,
        refund,
        addTier,
        togglePause,
        extendDeadline,
        getCampaignStatus,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
}

export function useCrowdfunding() {
  return useContext(CrowdfundingContext);
}

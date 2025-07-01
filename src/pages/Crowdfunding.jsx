import { useCrowdfunding } from "../contexts/CrowdfundingContext";
import { useWallet } from "../contexts/wallet";
import { useEffect, useState } from "react";

export default function CrowdfundingPage() {
  const {
    tiers,
    fund,
    withdraw,
    refund,
    getBalance,
    addTier,
    togglePause,
    extendDeadline,
    getCampaignStatus,
  } = useCrowdfunding();

  const { address, isConnected } = useWallet();
  const [balance, setBalance] = useState(0);
  const [campaignStatus, setCampaignStatus] = useState("");

  const [newTierName, setNewTierName] = useState("");
  const [newTierAmount, setNewTierAmount] = useState("");

  useEffect(() => {
    async function loadInfo() {
      const bal = await getBalance();
      const status = await getCampaignStatus();
      setBalance(Number(bal));
      setCampaignStatus(status.toString());
    }

    if (isConnected) loadInfo();
  }, [isConnected, tiers]);

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        💡 Crowdfunding Campaign
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p>
          <strong>Status:</strong> {campaignStatus}
        </p>
        <p>
          <strong>Total Balance:</strong> {balance} wei
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🎯 Funding Tiers</h2>
        {tiers.length === 0 ? (
          <p className="text-gray-600">Belum ada tier.</p>
        ) : (
          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{tier.name}</p>
                  <p>
                    {tier.amount} wei — {tier.backers} backers
                  </p>
                </div>
                <button
                  onClick={() => fund(index, tier.amount.toString())}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Fund
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isConnected && (
        <div className="space-y-4">
          <button
            onClick={withdraw}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            🏦 Withdraw (Owner Only)
          </button>

          <button
            onClick={refund}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            💸 Refund (If Failed)
          </button>

          <button
            onClick={togglePause}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            ⏸️ Toggle Pause (Owner Only)
          </button>

          <button
            onClick={() => extendDeadline(3)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            ⏳ Extend Deadline (+3 hari)
          </button>
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">➕ Tambah Tier Baru (Owner)</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Tier"
            value={newTierName}
            onChange={(e) => setNewTierName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount dalam wei"
            value={newTierAmount}
            onChange={(e) => setNewTierAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            onClick={() => addTier(newTierName, BigInt(newTierAmount))}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ➕ Tambah Tier
          </button>
        </div>
      </div>
    </section>
  );
}

import { useWallet } from "../contexts/wallet";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { address, connect, chainId } = useWallet();
  const isHolesky = chainId === 17000;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <h1 className="text-xl font-bold">Crowdfunding</h1>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/crowdfunding" className="hover:underline">Crowdfunding</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>

      <div className="flex items-center space-x-4">
        {!isHolesky && (
          <span className="text-red-500 text-sm">
            Switch to Holesky
          </span>
        )}

        <button
          onClick={connect}
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          {address ? (
            `${address.slice(0, 6)}...${address.slice(-4)}`
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>
    </nav>
  );
}

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import contracts from "../contracts";
import { formatEther, parseEther, zeroAddress } from "viem";
import { useState } from "react";

const Main = () => {
  // Form state
  const [cltInput, setCltInput] = useState("");

  // Wallet and contract interaction
  const { address: connectedAccount } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Formatting helper
  const formatNumber = (value: bigint | undefined) => {
    if (value === undefined) return "0.00";
    return parseFloat(formatEther(value)).toFixed(2);
  };

  // Contract data fetching
  const { data: totalBorrowed } = useReadContract({
    ...contracts.borrowFi,
    functionName: "totalBorrowed"
  });

  const { data: totalCollateral } = useReadContract({
    ...contracts.borrowFi,
    functionName: "totalCollateral"
  });

  const { data: userCollateral } = useReadContract({
    ...contracts.borrowFi,
    functionName: "collateralOf",
    args: [connectedAccount ?? zeroAddress]
  });

  const { data: userLoan } = useReadContract({
    ...contracts.borrowFi,
    functionName: "loanOf",
    args: [connectedAccount ?? zeroAddress]
  });

  const { data: availableBorrow } = useReadContract({
    ...contracts.borrowToken,
    functionName: "balanceOf",
    args: [contracts.borrowFi.address]
  });

  const { data: userBFI } = useReadContract({
    ...contracts.borrowToken,
    functionName: "balanceOf",
    args: [connectedAccount ?? zeroAddress]
  });

  const { data: userCLT } = useReadContract({
    ...contracts.cltToken,
    functionName: "balanceOf",
    args: [connectedAccount ?? zeroAddress]
  });

  const { data: ltcRatio } = useReadContract({
    ...contracts.borrowFi,
    functionName: "getLTC"
  });

  const { data: isHealthy } = useReadContract({
    ...contracts.borrowFi,
    functionName: "isHealthy",
  });

  const { data: totalCltSupply } = useReadContract({
    ...contracts.cltToken,
    functionName: "totalSupply"
  });

  const { data: totalBorrowTokenSupply } = useReadContract({
    ...contracts.borrowToken,
    functionName: "totalSupply"
  });

  const handleAddCollateral = async () => {
    if (!cltInput) return;
    const parsedAmount = parseEther(cltInput);
    
    try {
      // First approve the contract to spend CLT
      await writeContractAsync({
        ...contracts.cltToken,
        functionName: "approve",
        args: [contracts.borrowFi.address, parsedAmount],
      });

      // Then add collateral
      await writeContractAsync({
        ...contracts.borrowFi,
        functionName: "addCollateral",
        args: [parsedAmount]
      });
      
      // Clear input on success
      setCltInput("");
      alert("Successfully added collateral!");
    } catch (error) {
      console.error("Error adding collateral:", error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to add collateral'}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Borrowing Dashboard
        </h1>

        {/* Market Overview */}
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Market Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 bg-gray-700/50 rounded-xl border border-gray-600">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Value Locked</h3>
              <p className="text-2xl font-bold text-white">{formatNumber(totalCollateral)} CLT</p>
              <div className="mt-2 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
            <div className="p-5 bg-gray-700/50 rounded-xl border border-gray-600">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Borrowed</h3>
              <p className="text-2xl font-bold text-white">{formatNumber(totalBorrowed)} BFI</p>
              <div className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
            </div>
            <div className="p-5 bg-gray-700/50 rounded-xl border border-gray-600">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Collateral Token Supply</h3>
              <p className="text-2xl font-bold text-white">{formatNumber(totalCltSupply)} CLT</p>
              <div className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
            </div>
            <div className="p-5 bg-gray-700/50 rounded-xl border border-gray-600">
              <h3 className="text-gray-400 text-sm font-medium mb-1">Total Borrow Token Supply</h3>
              <p className="text-2xl font-bold text-white">{formatNumber(totalBorrowTokenSupply)} BFI</p>
              <div className="mt-2 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Position */}
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Your Position
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Collateral:</span>
                <span className="text-lg font-medium">{formatNumber(userCollateral)} CLT</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Loan:</span>
                <span className="text-lg font-medium">{formatNumber(userLoan)} BFI</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">LTV:</span>
                <span className="text-lg font-medium">
                  {ltcRatio ? (Number(ltcRatio) / 1e16).toFixed(2) : '0.00'}%
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Status:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isHealthy ? 'bg-green-900/30 text-green-400' : !isHealthy ? 'bg-red-900/30 text-red-400' : 'bg-gray-900/30 text-gray-400'
                }`}>
                  {isHealthy ? 'Healthy' : !isHealthy ? 'Not Healthy' : 'Unknown' }
                </span>
              </div>
            </div>
          </div>

          {/* Balances */}
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
            <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Balances
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Your CLT:</span>
                <span className="text-lg font-medium">{formatNumber(userCLT)} CLT</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400">Your BFI:</span>
                <span className="text-lg font-medium">{formatNumber(userBFI)} BFI</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Available to Borrow:</span>
                <span className="text-lg font-medium text-blue-400">{formatNumber(availableBorrow)} BFI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Collateral */}
        <div className="p-6 bg-gray-800 rounded-xl border border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Add Collateral
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="number"
                value={cltInput}
                onChange={(e) => setCltInput(e.target.value)}
                placeholder="Enter CLT amount"
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddCollateral}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Add Collateral
              </button>
            </div>
            <p className="text-sm text-gray-400">
              Available: <span className="text-blue-400">{formatNumber(userCLT)} CLT</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Main;

import { useAccount, useReadContract, useWriteContract } from "wagmi";
import contracts from "../contracts";
import { formatEther, parseEther, zeroAddress } from "viem";
import { useState } from "react";

export default function Dashboard() {

    const [cltInput, setCltInput] = useState("");
    const { address: connectedAccount } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const [error, setError] = useState("");
    const formatNumber = (value: bigint | undefined) => {
        if (value === undefined) return "0.00";
        return parseFloat(formatEther(value)).toFixed(2);
    };

    const { data: userCLT } = useReadContract({
        ...contracts.cltToken,
        functionName: "balanceOf",
        args: [connectedAccount ?? zeroAddress]
    });

    const handleAddCollateral = async () => {
        if (!cltInput) {
            setError("Please enter an amount");
            return
        };
        const parsedAmount = parseEther(cltInput);

        try {
            await writeContractAsync({
                ...contracts.cltToken,
                functionName: "approve",
                args: [contracts.borrowFi.address, parsedAmount],
            });

            await writeContractAsync({
                ...contracts.borrowFi,
                functionName: "addCollateral",
                args: [parsedAmount]
            });

            setCltInput("");
            alert("Successfully added collateral!");
        } catch (error) {
            console.error("Error adding collateral:", error);
            alert(`Error: ${error instanceof Error ? error.message : 'Failed to add collateral'}`);
        }
    };


    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl mt-15 md:mt-0 font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Borrow
            </h1>

            <div className="flex flex-col md:flex-row gap-6 max-w-full mx-auto">
                {/* Add Collateral */}
                <div className="md:w-1/2 w-full p-6 bg-gray-800 rounded-xl border border-gray-700 mb-8">
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
                                className={` ${error ? "border-red-500" : "border-gray-600"} flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            <button
                                onClick={handleAddCollateral}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Add Collateral
                            </button>
                        </div>
                        <p className="text-md text-gray-400 gap-6 flex items-center">
                            <p>Available: <span className="text-blue-400">{formatNumber(userCLT)} CLT</span> </p>
                            {error && <p className="text-red-500">{error}</p>}
                        </p>
                    </div>
                </div>

                <div className="md:w-1/2 w-full p-6 bg-gray-800 rounded-xl border border-gray-700 mb-8">
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
}
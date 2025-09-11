import { useAccount, useReadContract, useWriteContract, useSimulateContract } from "wagmi";
import contracts from "../contracts";
import { formatEther, parseEther, zeroAddress } from "viem";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Repay() {

    const [cltInput, setCltInput] = useState("");
    const [bfiInput, setBfiInput] = useState("");
    const { address: connectedAccount } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const [cltInputError, setCltInputError] = useState("");
    const [bfiInputError, setBfiInputError] = useState("");
    const [isRepayLoading, setIsRepayLoading] = useState(false);

    const formatNumber = (value: bigint | undefined) => {
        if (value === undefined) return "0.00";
        return parseFloat(formatEther(value)).toFixed(2);
    };

    const { data: userCLT } = useReadContract({
        ...contracts.cltToken,
        functionName: "balanceOf",
        args: [connectedAccount ?? zeroAddress]
    });

    const { data: userBFI } = useReadContract({
        ...contracts.borrowToken,
        functionName: "balanceOf",
        args: [connectedAccount ?? zeroAddress]
    });

    const ApproveSimulationResult = useSimulateContract({
        ...contracts.cltToken,
        functionName: "approve",
        args: [contracts.borrowFi.address, parseEther(cltInput)],
    })

    const AddCollateralSimulationResult = useSimulateContract({
        ...contracts.borrowFi,
        functionName: "addCollateral",
        args: [parseEther(cltInput)],
    })

    const RepaySimulationResult = useSimulateContract({
        ...contracts.borrowFi,
        functionName: "repay",
        args: [parseEther(bfiInput)],
    })

    const handleAddCollateral = async () => {
        if (!cltInput) {
            setCltInputError("Enter CLT amount jor");
            return
        };
        const parsedAmount = parseEther(cltInput);

        try {

            if (ApproveSimulationResult.isError) {
                toast.error(ApproveSimulationResult.error.message);
                return;
            }
            console.log("ApproveSimulationResult", ApproveSimulationResult.status);

            if (AddCollateralSimulationResult.isError) {
                toast.error(AddCollateralSimulationResult.error.message);
                return;
            }
            console.log("AddCollateralSimulationResult", AddCollateralSimulationResult.status);

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
            toast.success("Successfully added collateral!");
        } catch (error) {
            console.error("Error adding collateral:", error);
            toast.error(`Error: ${error instanceof Error ? error.message : 'Failed to add collateral'}`);
        }
    };

    const handleRepay = async () => {
        if (!bfiInput) {
            setBfiInputError("No vex me! Enter BFI amount");
            return
        };

        const parsedAmount = parseEther(bfiInput);
        setIsRepayLoading(false);

        try {
            setIsRepayLoading(true);

            if (RepaySimulationResult.isError) {
                toast.error(RepaySimulationResult.error.message);
                return;
            }
            console.log("RepaySimulationResult", RepaySimulationResult.status);

            await writeContractAsync({
                ...contracts.borrowFi,
                functionName: "repay",
                args: [parsedAmount]
            });

            setBfiInput("");
            setIsRepayLoading(false);
            toast.success("Successfully repayed " + bfiInput + " BFI");
        } catch (error) {
            console.error("Error repaying:", error);
            setIsRepayLoading(false);
            toast.error(`Error: ${error instanceof Error ? error.message : 'Failed to repay'}`);
        }
    }


    return (
        <div className="p-4 md:p-8">
            <h1 className="text-3xl mt-15 md:mt-0 font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Repay and Withdraw Collateral
            </h1>

            <div className="flex flex-col md:flex-row gap-6 max-w-full mx-auto">

                <div className="md:w-1/2 w-full p-6 bg-gray-800 rounded-xl border border-gray-700 mb-8">
                    <h2 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        Repay
                    </h2>
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="number"
                                value={bfiInput}
                                onChange={(e) => setBfiInput(e.target.value)}
                                placeholder="Enter BFI amount"
                                className={` ${bfiInputError ? "border-red-500" : "border-gray-600"} flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            <button
                                onClick={handleRepay}
                                disabled={isRepayLoading}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                {isRepayLoading ? "Processing..." : "Repay"}
                            </button>
                        </div>
                        <p className="text-md text-gray-400 gap-2 md:gap-6 flex items-center">
                            <p>Your BFI Balance: <span className="text-blue-400">{formatNumber(userBFI)} BFI</span> </p>
                            {bfiInputError && <p className="text-red-500">{bfiInputError}</p>}
                        </p>
                    </div>
                </div>

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
                                className={` ${cltInputError ? "border-red-500" : "border-gray-600"} flex-1 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                            />
                            <button
                                onClick={handleAddCollateral}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                            >
                                Add Collateral
                            </button>
                        </div>
                        <p className="text-md text-gray-400 gap-2 md:gap-6 flex items-center">
                            <p>Your CLT Balance: <span className="text-blue-400">{formatNumber(userCLT)} CLT</span> </p>
                            {cltInputError && <p className="text-red-500">{cltInputError}</p>}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}
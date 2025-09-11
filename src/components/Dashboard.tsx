import { formatEther } from "viem";

interface DashboardProps {
  totalBorrowed: bigint | undefined;
  totalCollateral: bigint | undefined;
  userCollateral: bigint | undefined;
  userLoan: bigint | undefined;
  userCLT: bigint | undefined;
  userBFI: bigint | undefined;
  availableBorrow: bigint | undefined;
  ltcRatio: bigint | undefined;
  isHealthy: boolean | undefined;
  onDeposit: (amount: string) => void;
  onBorrow: (amount: string) => void;
  onRepay: (amount: string) => void;
  onWithdraw: (amount: string) => void;
}

const Dashboard = ({
  totalBorrowed,
  totalCollateral,
  userCollateral,
  userLoan,
  userCLT,
  userBFI,
  availableBorrow,
  ltcRatio,
  isHealthy,
  onDeposit,
  onBorrow,
  onRepay,
  onWithdraw,
}: DashboardProps) => {
  const formatNumber = (value: bigint | undefined, decimals: number = 18) => {
    if (value === undefined) return "0.00";
    return parseFloat(formatEther(value)).toFixed(2);
  };

  const formatPercentage = (value: bigint | undefined) => {
    if (value === undefined) return "0.00";
    return (Number(formatEther(value)) * 100).toFixed(2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dashboard Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Borrowing Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your collateral and loans in one place
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Your Collateral</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {formatNumber(userCollateral)} CLT
          </p>
          <p className="text-sm text-gray-500">
            ${(parseFloat(formatNumber(userCollateral)) * 100).toFixed(2)} USD
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Your Loan</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {formatNumber(userLoan)} BFI
          </p>
          <p className="text-sm text-gray-500">
            ${(parseFloat(formatNumber(userLoan)) * 1.5).toFixed(2)} USD
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Health Factor</p>
          <div className="mt-2 flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
              <div 
                className={`h-2.5 rounded-full ${isHealthy ? 'bg-green-500' : 'bg-red-500'}`}
                style={{ width: isHealthy ? '100%' : '30%' }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${isHealthy ? 'text-green-600' : 'text-red-600'}`}>
              {isHealthy ? 'Healthy' : 'At Risk'}
            </span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            LTV: {ltcRatio ? formatPercentage(ltcRatio) : '0.00'}%
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500">Available to Borrow</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {formatNumber(availableBorrow)} BFI
          </p>
          <p className="text-sm text-gray-500">
            ${(parseFloat(formatNumber(availableBorrow)) * 1.5).toFixed(2)} USD
          </p>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Total Value Locked</h4>
            <p className="text-2xl font-semibold text-gray-900">
              ${(parseFloat(formatNumber(totalCollateral)) * 100).toFixed(2)} USD
            </p>
            <p className="text-sm text-gray-500">{formatNumber(totalCollateral)} CLT</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Total Borrowed</h4>
            <p className="text-2xl font-semibold text-gray-900">
              ${(parseFloat(formatNumber(totalBorrowed)) * 1.5).toFixed(2)} USD
            </p>
            <p className="text-sm text-gray-500">{formatNumber(totalBorrowed)} BFI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

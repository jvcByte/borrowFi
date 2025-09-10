import { ConnectButton } from "@rainbow-me/rainbowkit";

const Welcome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          Welcome to BorrowFi
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Connect your wallet to access your decentralized finance dashboard and start borrowing and lending with ease.
        </p>
        <div className="flex justify-center">
          <ConnectButton
            label="Connect Wallet"
            accountStatus="address"
            showBalance={false}
            chainStatus="none"
          />
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="text-blue-400 text-2xl mb-2">🔒</div>
            <h3 className="text-xl font-semibold mb-2">Secure</h3>
            <p className="text-gray-400">Your assets are safe with our non-custodial solution</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="text-purple-400 text-2xl mb-2">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast</h3>
            <p className="text-gray-400">Quick transactions with low fees on the blockchain</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-xl border border-gray-700">
            <div className="text-green-400 text-2xl mb-2">🌐</div>
            <h3 className="text-xl font-semibold mb-2">Decentralized</h3>
            <p className="text-gray-400">Take full control of your financial future</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            BorrowFi
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <ConnectButton
            accountStatus="address"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

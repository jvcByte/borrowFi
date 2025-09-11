import { useAccount } from "wagmi";
import Main from "./components/Main";
import Welcome from "./components/Welcome";

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gray-50">
      {isConnected ? (
        <>
          <Main />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;

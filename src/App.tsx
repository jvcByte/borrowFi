import { useAccount } from "wagmi";
import Header from "./components/Header";
import Main from "./components/Main";
import Welcome from "./components/Welcome";

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-gray-50">
      {isConnected ? (
        <>
          <Header />
          <Main />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;

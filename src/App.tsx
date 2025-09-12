import Main from "./Pages/Main";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "./config";
import { Toaster } from "react-hot-toast";
import { useAccount } from "wagmi";
import Welcome from "./components/Welcome";

const queryClient = new QueryClient();

function App() {
  const { address: connectedAccount } = useAccount();
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        {connectedAccount ? <Main /> : <Welcome />}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
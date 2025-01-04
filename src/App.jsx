import Editor from "./pages/Editor";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Editor />
      </QueryClientProvider>
    </>
  );
}

export default App;

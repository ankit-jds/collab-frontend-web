import Editor from "./pages/Editor";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Login />
        {/* <Editor /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;

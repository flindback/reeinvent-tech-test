import "./App.css";
import Search from "./components/Search";
import { SynonymsProvider } from "./context/SynonymsContext";

function App() {
  return (
    <SynonymsProvider>
      <Search />
    </SynonymsProvider>
  );
}

export default App;

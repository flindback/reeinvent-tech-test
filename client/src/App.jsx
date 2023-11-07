import "./App.css";
import { SynonymsProvider } from "./context/SynonymsContext";
import Header from "./components/Header";
import AddModal from "./components/Add";
import Search from "./components/Search";
import Results from "./components/Results";

function App() {
  return (
    <>
      <Header />
      <SynonymsProvider>
        <AddModal />
        <Header />
        <Search />
        <Results />
      </SynonymsProvider>
    </>
  );
}

export default App;

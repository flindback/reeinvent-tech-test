import "./App.css";
import Search from "./components/Search";
import Results from "./components/Results";
import { SynonymsProvider } from "./context/SynonymsContext";
import { Box, Heading } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Heading as="h1" size="xl" pt="16px">
        SynonymFinder!
      </Heading>
      <Box pb="24px" pt="12px">
        <p>This nifty webapp lets you look up and add synonyms!</p>
      </Box>
      <SynonymsProvider>
        <Search />
        <Results />
      </SynonymsProvider>
    </>
  );
}

export default App;

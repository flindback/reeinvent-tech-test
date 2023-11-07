import { Spinner, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useSynonyms } from "../../context/SynonymsContext";

const Results = () => {
  //deconstruct the searchState from the context into 'isLoading','synonyms', 'lastSearchTerm'
  const {
    searchState: { isLoading, results, lastSearchTerm },
  } = useSynonyms();
  if (isLoading) {
    return <Spinner size={"lg"} />;
  }
  const { synonyms = [] } = results;
  const wordList = synonyms.filter((word) => word !== lastSearchTerm.trim());

  return (
    <Stack>
      <Wrap pt="24px">
        {synonyms.length ? (
          wordList.map((word) => {
            return <WrapItem key={word}>{word}</WrapItem>;
          })
        ) : (
          <Text>No synonyms.</Text>
        )}
      </Wrap>
    </Stack>
  );
};

export default Results;

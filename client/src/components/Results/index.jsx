import { Box, Spinner, Stack, Text } from "@chakra-ui/react";
import { useSynonyms } from "../../context/SynonymsContext";

const Results = () => {
  //deconstruct the searchState from the context into 'isLoading','synonyms', 'searchTerm'
  const {
    searchState: {
      isLoading,
      results: { synonyms },
    },
  } = useSynonyms();
  if (isLoading) {
    return <Spinner size={"lg"} />;
  }
  return (
    <Stack>
      <Box>
        <Text>No synonyms found</Text>
      </Box>
    </Stack>
  );
};

export default Results;

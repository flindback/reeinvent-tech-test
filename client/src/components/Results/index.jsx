import {
  Heading,
  Spinner,
  Stack,
  Tag,
  TagLabel,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
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
      <Heading as="h2" align={"left"} size="md" pt="24px">
        Synonyms for {lastSearchTerm}
      </Heading>
      <Wrap>
        {synonyms.length ? (
          wordList.map((word) => {
            return (
              <WrapItem key={word}>
                <Tag size="lg" colorScheme="teal">
                  <TagLabel>{word}</TagLabel>
                </Tag>
              </WrapItem>
            );
          })
        ) : (
          <Text>No synonyms.</Text>
        )}
      </Wrap>
    </Stack>
  );
};

export default Results;

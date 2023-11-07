import { Stack, Box, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Stack as="header">
      <Heading as="h1" size="xl" pt="16px">
        SynonymFinder!
      </Heading>
      <Box pb="24px" pt="12px">
        <p>This nifty webapp lets you look up and add synonyms!</p>
      </Box>
    </Stack>
  );
};

export default Header;

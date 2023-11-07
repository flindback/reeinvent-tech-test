import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useSynonyms } from "../../context/SynonymsContext";

const Search = () => {
  const { searchState, searchDispatch, searchForSynonyms } = useSynonyms();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { searchTerm } = searchState;
    await searchForSynonyms(searchTerm);
    searchDispatch({ type: "LAST_SEARCH_TERM", payload: searchTerm });
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Look up synonyms!"
          id="synonym-search"
          name="synonym-search"
          value={searchState.searchTerm}
          onChange={(e) =>
            searchDispatch({ type: "SET_SEARCH_TERM", payload: e.target.value })
          }
        />
        <Button type="submit">Search</Button>
      </InputGroup>
    </form>
  );
};

export default Search;

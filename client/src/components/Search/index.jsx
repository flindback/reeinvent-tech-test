import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
//https://reeinvent-tech-test-st7ohfgpsq-lz.a.run.app/

const Search = () => {
  const apiURL = "https://reeinvent-tech-test-st7ohfgpsq-lz.a.run.app/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // https://developer.mozilla.org/en-US/docs/Web/API/FormData - Web native fetching of form elements
    let searchTerm = formData.get("synonym-search");
    const { data } = await axios.post(
      `${apiURL}/find`,
      { word: { searchTerm } },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  };
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="tel"
          placeholder="Look up synonyms!"
          id="synonym-search"
          name="synonym-search"
        />
        <Button type="submit">Search</Button>
      </InputGroup>
    </form>
  );
};

export default Search;

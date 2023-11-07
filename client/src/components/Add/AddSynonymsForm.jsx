import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const AddSynonymsForm = ({
  words,
  setWords,
  addSynonyms,
  setHasAddedSynonyms,
}) => {
  const handleKeyDown = (e) => {
    const actionableKeys = ["Enter", "NumpadEnter", "Space", "Comma"];
    if (actionableKeys.indexOf(e.code) !== -1) {
      e.preventDefault();
      const word = e.target.value.trim();
      if (word.length > 0 && words.indexOf(word) === -1) {
        setWords([...words, word]);
      }
      e.target.value = "";
    }
  };

  const removeTag = (e, word) => {
    e.preventDefault();
    const newWords = words.filter((w) => w !== word);
    setWords(newWords);
  };

  const handleClick = () => {
    addSynonyms(words);
    setWords([]);
    setHasAddedSynonyms(true);
  };
  return (
    <FormControl>
      <FormLabel>Synonyms to add:</FormLabel>
      <Input type="text" onKeyDown={(e) => handleKeyDown(e)} />
      <FormHelperText mb="10px">
        Add some words! Press enter, space or comma to add a word.
      </FormHelperText>
      <Wrap spacing={4}>
        {words.map((word) => {
          return (
            <WrapItem key={word}>
              <Tag size="lg">
                <TagLabel key={word}>{word}</TagLabel>
                <TagCloseButton onClick={(e) => removeTag(e, word)} />
              </Tag>
            </WrapItem>
          );
        })}
      </Wrap>
      <Button mt={4} colorScheme="teal" type="submit" onClick={handleClick}>
        Submit
      </Button>
    </FormControl>
  );
};

export default AddSynonymsForm;

AddSynonymsForm.propTypes = {
  words: PropTypes.array.isRequired,
  setWords: PropTypes.func.isRequired,
  addSynonyms: PropTypes.func.isRequired,
  setHasAddedSynonyms: PropTypes.func.isRequired,
};

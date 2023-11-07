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

const AddSynonymsForm = ({ addDispatch, addState, addSynonyms }) => {
  console.log(addState.wordsToAdd);
  const handleKeyDown = (e) => {
    const actionableKeys = ["Enter", "NumpadEnter", "Space", "Comma"];
    if (actionableKeys.indexOf(e.code) !== -1) {
      e.preventDefault();
      const word = e.target.value.trim();
      if (word.length > 0 && addState.wordsToAdd.indexOf(word) === -1) {
        addDispatch({ type: "ADD_WORD", payload: word });
      }
      e.target.value = "";
    }
  };

  const removeTag = (e, word) => {
    e.preventDefault();
    const newWords = addState.wordsToAdd.filter((w) => w !== word);
    addDispatch({ type: "REMOVE_WORD", payload: newWords });
  };

  const handleClick = () => {
    addSynonyms(addState.wordsToAdd);
    addDispatch({ type: "SET_HAS_ADDED_SYNONYMS", payload: true });
    addDispatch({ type: "RESET_WORDS_TO_ADD" });
  };
  return (
    <FormControl>
      <FormLabel>Synonyms to add:</FormLabel>
      <Input type="text" onKeyDown={(e) => handleKeyDown(e)} />
      <FormHelperText mb="10px">
        Add some words! Press enter, space or comma to add a word.
      </FormHelperText>
      <Wrap spacing={4}>
        {addState.wordsToAdd.map((word) => {
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
  addState: PropTypes.object.isRequired,
  addDispatch: PropTypes.func.isRequired,
  addSynonyms: PropTypes.func.isRequired,
};

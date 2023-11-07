import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
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
import { useState } from "react";
const Add = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [words, setWords] = useState([]);

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
  console.log(words);
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add synonyms</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Synonyms to add:</FormLabel>
              <Input
                type="text"
                onKeyDown={(e) => handleKeyDown(e)}
                mb="24px"
              />
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
              <FormHelperText>
                Write something in the box above to add synonyms!
              </FormHelperText>
              <Button mt={4} colorScheme="teal" type="submit">
                Submit
              </Button>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Add;

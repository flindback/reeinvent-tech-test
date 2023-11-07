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
} from "@chakra-ui/react";
import { useSynonyms } from "../../context/SynonymsContext";
import AddSynonymsForm from "./AddSynonymsForm";
import { useState } from "react";

const Add = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wordsToAdd, setWordsToAdd, addSynonyms } = useSynonyms();
  const [hasAddedSynonyms, setHasAddedSynonyms] = useState(false);

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Add synonyms
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add synonyms</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {hasAddedSynonyms ? (
              <>
                <p>Synonyms added!</p>
                <Button onClick={() => setHasAddedSynonyms(false)}>
                  Add more!
                </Button>
              </>
            ) : (
              <AddSynonymsForm
                words={wordsToAdd}
                setWords={setWordsToAdd}
                setHasAddedSynonyms={setHasAddedSynonyms}
                addSynonyms={addSynonyms}
              />
            )}
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

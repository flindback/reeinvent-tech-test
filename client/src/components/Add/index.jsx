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

const Add = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addSynonyms, addDispatch, addState } = useSynonyms();

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" mb="24px">
        Add synonyms
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add synonyms</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {addState.hasAddedSynonyms ? (
              <>
                <p>Synonyms added!</p>
                <Button
                  onClick={() =>
                    addDispatch({
                      type: "SET_HAS_ADDED_SYNONYMS",
                      payload: false,
                    })
                  }
                >
                  Add more!
                </Button>
              </>
            ) : (
              <AddSynonymsForm
                addDispatch={addDispatch}
                addSynonyms={addSynonyms}
                addState={addState}
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

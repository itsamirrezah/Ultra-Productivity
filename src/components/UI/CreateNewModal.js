//imports
import { useState } from "react";
import {
  VStack,
  HStack,
  InputGroup,
  Text,
  Input,
  FormControl,
} from "@chakra-ui/react";
//components
import Modal from "./Modal";
//data
import ColorItems from "../colors/ColorItems";

function CreateNewModal({
  isOpen,
  onClose,
  header,
  type,
  color,
  title = "",
  onSubmit,
}) {
  const [selectedColor, setColor] = useState(null);
  const [input, setInput] = useState("");

  function onSubmitHandler() {
    const payload = { title: input || title, color: selectedColor };
    onSubmit(payload);
    setInput("");
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={header}
      size="lg"
      submitCaption="Save"
      onSubmit={onSubmitHandler}
    >
      <FormControl>
        <VStack spacing={4}>
          <InputGroup flexDir="column-reverse">
            <Input
              variant="filled"
              placeholder={`Input Your ${type} Name`}
              value={input || title}
              onChange={(e) => setInput(e.target.value)}
            />
            <Text fontSize="larger">{`${type}:`}</Text>
          </InputGroup>
          <HStack w="full" spacing="4">
            <Text fontSize="larger">Color</Text>
            <ColorItems
              currentColor={selectedColor || color}
              setColor={setColor}
            />
          </HStack>
        </VStack>
      </FormControl>
    </Modal>
  );
}

export default CreateNewModal;

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
import { colors } from "../../data/app-data";
import ColorItems from "../colors/ColorItems";

function CreateNewModal({
  isOpen,
  onClose,
  header,
  type,
  color,
  title,
  onSubmit,
}) {
  const [selectedColor, setColor] = useState(color ? color : null);
  const [input, setInput] = useState(title ? title : null);

  function onSubmitHandler() {
    const payload = { title: input, color: selectedColor };
    onSubmit(payload);
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Text fontSize="larger">{`${type}:`}</Text>
          </InputGroup>
          <HStack w="full" spacing="4">
            <Text fontSize="larger">Color</Text>
            {/* colors */}
            <ColorItems
              items={colors}
              currentColor={selectedColor}
              setColor={setColor}
            />
          </HStack>
        </VStack>
      </FormControl>
    </Modal>
  );
}

export default CreateNewModal;

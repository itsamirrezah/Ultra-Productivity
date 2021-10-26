//imports
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

function CreateNewModal({ isOpen, onClose, entity }) {
  const title = `Create New ${entity}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <FormControl>
        <VStack spacing={4}>
          <InputGroup flexDir="column-reverse">
            <Input variant="filled" placeholder={`Input Your ${entity} Name`} />
            <Text fontSize="larger">{`${entity}:`}</Text>
          </InputGroup>
          <HStack w="full" spacing="4">
            <Text fontSize="larger">Color</Text>
            {/* colors */}
            <ColorItems items={colors} />
          </HStack>
        </VStack>
      </FormControl>
    </Modal>
  );
}

export default CreateNewModal;

import { Button, useDisclosure } from "@chakra-ui/react";
import CreateNewModal from "./CreateNewModal";

function CreateNewButton({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        w="full"
        justifyContent="flex-start"
        variant="ghost"
        leftIcon={<data.button.icon />}
        onClick={onOpen}
      >
        {data.button.text}
      </Button>
      <CreateNewModal isOpen={isOpen} onClose={onClose} entity={data.text} />
    </>
  );
}

export default CreateNewButton;

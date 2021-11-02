import { Button, useDisclosure } from "@chakra-ui/react";
import CreateNewModal from "./CreateNewModal";

function CreateNewButton({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onCreateNewSection(payload) {
    console.log("dispatch state with ", payload);
  }

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
      <CreateNewModal
        header={`Create New ${data.text}`}
        isOpen={isOpen}
        onClose={onClose}
        type={data.text}
        onSubmit={onCreateNewSection}
      />
    </>
  );
}

export default CreateNewButton;

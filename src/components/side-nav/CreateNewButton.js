import { Button, useDisclosure } from "@chakra-ui/react";
import CreateNewModal from "../UI/CreateNewModal";
import { useDispatch } from "../../store/tasks-context";

function CreateNewButton({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  function onCreateNewSection(payload) {
    dispatch(data.button.action({ ...payload }));
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

//imports
import { VStack, useDisclosure } from "@chakra-ui/react";
//components
import TaskItem from "./TaskItem";
import EditTagModal from "./EditTagModal";
import SubtaskItems from "./SubtaskItems";

function TaskItems({ task, allTags, onAddTags }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack
        key={task.id}
        w="full"
        rounded="lg"
        spacing="0.5"
        bgColor="blackAlpha.600"
        maxW="4xl"
      >
        <TaskItem task={task} props={{ py: "2" }} onOpenTag={onOpen} />
        {task.subtasks.length > 0 && <SubtaskItems items={task.subtasks} />}
      </VStack>
      {isOpen && (
        <EditTagModal
          isOpen={isOpen}
          onClose={onClose}
          tagIds={task.tagIds}
          task={task}
          allTags={allTags}
          onSubmit={(tagIds) => onAddTags(task.id, tagIds)}
        />
      )}
    </>
  );
}

export default TaskItems;

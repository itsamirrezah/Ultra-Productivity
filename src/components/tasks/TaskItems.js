//imports
import { VStack, useDisclosure } from "@chakra-ui/react";
//components
import TaskItem from "./TaskItem";
import EditTagModal from "./EditTagModal";
import SubtaskItems from "./SubtaskItems";
import { Draggable } from "react-beautiful-dnd";

function TaskItems({ task, allTags, onAddTags, index }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <VStack
            key={task.id}
            w="full"
            rounded="lg"
            spacing="0.5"
            bgColor="blackAlpha.600"
            maxW="4xl"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <TaskItem
              task={task}
              props={{ py: "2" }}
              onOpenTag={onOpen}
              handleDrag={provided.dragHandleProps}
            />
            {task.subtasks.length > 0 && <SubtaskItems items={task.subtasks} />}
          </VStack>
        )}
      </Draggable>
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

import { Droppable, Draggable } from "react-beautiful-dnd";
import TaskItem from "../tasks/TaskItem";
import Subtasks from "./Subtasks";
import { VStack } from "@chakra-ui/react";
import { memo } from "react";

function Task({ task, type, index }) {
  const props = styles[type];
  return (
    <Draggable draggableId={task.id} index={index} key={task.id}>
      {(provided) => (
        <VStack
          rounded="lg"
          width="full"
          bgColor="blackAlpha.600"
          spacing="1"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <TaskItem
            task={task}
            props={props}
            handleDrag={provided.dragHandleProps}
          />
          {type === "task" && (
            <Droppable droppableId={task.id} type="subtask">
              {(provided) => (
                <Subtasks
                  subtasks={task.subtasks}
                  droppableProps={provided.droppableProps}
                  innerRef={provided.innerRef}
                  droppablePlaceHolder={provided.placeholder}
                />
              )}
            </Droppable>
          )}
        </VStack>
      )}
    </Draggable>
  );
}

const styles = {
  task: {
    py: "2",
  },
  subtask: {
    bgColor: "whiteAlpha.200",
  },
};

export default memo(Task, (prev, next) => {
  if (prev.task.updatedAt === next.task.updatedAt) return true;
  return false;
});

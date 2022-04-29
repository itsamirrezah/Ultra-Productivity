import { VStack } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

export default function TaskList({ tasks, type }) {
  return type === "task" ? (
    <Droppable droppableId="droppable-task" type="task">
      {(provided) => (
        <VStack w="full" {...provided.droppableProps} ref={provided.innerRef}>
          {tasks.map((t, i) => {
            return <Task key={t.id} task={t} type={type} index={i} />;
          })}
          {provided.placeholder}
        </VStack>
      )}
    </Droppable>
  ) : type === "subtask" ? (
    tasks.map((t, i) => {
      return <Task key={t.id} task={t} type={type} index={i} />;
    })
  ) : null;
}

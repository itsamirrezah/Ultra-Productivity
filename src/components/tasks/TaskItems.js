//imports
import { VStack } from "@chakra-ui/react";
import SubtaskItems from "./SubtaskItems";
//components
import TaskItem from "./TaskItem";

function TaskItems({ tasks }) {
  return (
    <VStack w="full" spacing="1">
      {tasks.map((task) => {
        return (
          <VStack
            key={task.id}
            w="full"
            rounded="lg"
            py="2"
            spacing="0.5"
            bgColor="rgba(0,0,0,0.5)"
            maxW="4xl"
          >
            <TaskItem task={task} />
            {task.subtasks.length > 0 && <SubtaskItems items={task.subtasks} />}
          </VStack>
        );
      })}
    </VStack>
  );
}

export default TaskItems;

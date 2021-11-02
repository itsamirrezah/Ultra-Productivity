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
            spacing="0.5"
            bgColor="blackAlpha.600"
            maxW="4xl"
          >
            <TaskItem task={task} props={{ py: "2" }} />
            {task.subtasks.length > 0 && <SubtaskItems items={task.subtasks} />}
          </VStack>
        );
      })}
    </VStack>
  );
}

export default TaskItems;

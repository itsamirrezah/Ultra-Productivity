//imports
import { VStack } from "@chakra-ui/react";
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
            {task.subtasks &&
              task.subtasks.map((subtask) => {
                return (
                  <TaskItem
                    key={subtask.id}
                    task={subtask}
                    subStyle={{
                      w: "95%",
                      alignSelf: "flex-end",
                      spacing: "0.5",
                      bgColor: "rgba(255,255,255,0.1)",
                      py: "1",
                      rounded: "md",
                    }}
                  />
                );
              })}
          </VStack>
        );
      })}
    </VStack>
  );
}

export default TaskItems;

//impors
import { useLocation } from "react-router-dom";
import { VStack, Box } from "@chakra-ui/react";
//data
// import appData from "../../data/app-data";
import TaskItems from "../tasks/TaskItems";
import Header from "../UI/Header";
import useTasks from "../../store/tasks-context";

function Tasks() {
  // const data = appData();
  const { state: data } = useTasks();
  const [_, filter, id] = useLocation().pathname.split("/");
  const filteredTasks = data[filter][id].taskIds.map((tId) => {
    const task = data.tasks[tId];
    task.subtasks = task.subTaskIds.map((sId) => data.tasks[sId]);
    task.tags = task.tagIds.map((tagId) => data.tags[tagId]);
    return task;
  });

  return (
    <VStack
      w="full"
      spacing="8"
      py="8"
      bgColor="#28112B"
      minH="100vh"
      px={["2", "4", "8"]}
    >
      {/* header */}
      <Header />
      <VStack w="full" spacing="0">
        {/* working status */}
        <Box>Working: 2h 3m</Box>
        {/* taskItems */}
        <TaskItems tasks={filteredTasks} />
      </VStack>
    </VStack>
  );
}

export default Tasks;

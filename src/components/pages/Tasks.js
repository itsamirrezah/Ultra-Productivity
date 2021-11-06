//imports
import { useLocation } from "react-router-dom";
import { VStack, Box, useDisclosure } from "@chakra-ui/react";
//components
import TaskItems from "../tasks/TaskItems";
import Header from "../UI/Header";
import NavDrawer from "../side-nav/NavDrawer";
import CreateNewModal from "../UI/CreateNewModal";
//data & actions
import useTasks, { useDispatch } from "../../store/tasks-context";
import { addTask, editProject, editTag, addTaskTag } from "../../store/actions";

function Tasks() {
  const {
    isOpen: isNavOpen,
    onOpen: onOpenNav,
    onClose: onCloseNav,
  } = useDisclosure();

  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const data = useTasks();
  const dispatch = useDispatch();
  const [_, filter, id] = useLocation().pathname.split("/");
  const section = data[filter][id];
  const filteredTasks = section.taskIds.map((tId) => {
    const task = data.tasks[tId];
    task.subtasks = task.subTaskIds.map((sId) => data.tasks[sId]);
    task.tags = task.tagIds.map((tagId) => data.tags[tagId]);
    return task;
  });

  function getAvailableTask() {
    for (let i = 0; i < filteredTasks.length; i++) {
      const task = filteredTasks[i];
      if (task.isDone) continue;
      for (let j = 0; j < task.subtasks.length; j++) {
        const subtask = task.subtasks[j];
        if (subtask.isDone) continue;
        return subtask;
      }
      return task;
    }
  }

  function onEditSection({ title, color }) {
    const payload = { id, title, color };
    if (section._.toLowerCase() === "project") dispatch(editProject(payload));
    else if (section._.toLowerCase() === "tag") dispatch(editTag(payload));
  }

  function onAddTaskHandler() {
    const action = addTask({
      projectId: section._ === "Project" ? id : null,
      tagId: section._ === "Tag" ? id : null,
    });
    dispatch(action);
  }

  function onAddTaskTagHandler(id, tagIds) {
    dispatch(addTaskTag({ id, tagIds }));
  }

  return (
    <>
      <VStack
        w="full"
        spacing="8"
        py="8"
        bgColor="#28112B"
        minH="100vh"
        px={["2", "4", "8"]}
      >
        {/* header */}
        <Header
          availableTask={getAvailableTask}
          title={section.title}
          onOpenNav={onOpenNav}
          onOpenModal={onOpenModal}
          isEditable={section.id !== "today"}
          onAddTaskHandler={onAddTaskHandler}
        />
        <VStack w="full" spacing="1">
          {/* working status */}
          <Box>Working: 2h 3m</Box>
          {/* taskItems */}
          {filteredTasks.map((task) => {
            return (
              <TaskItems
                key={task}
                task={task}
                allTags={data.tags}
                onAddTags={onAddTaskTagHandler}
              />
            );
          })}
        </VStack>
      </VStack>
      <NavDrawer isOpen={isNavOpen} onClose={onCloseNav} />
      {isModalOpen && (
        <CreateNewModal
          header={`Edit ${section._}`}
          isOpen={isModalOpen}
          onClose={onCloseModal}
          type={section._}
          color={section.color}
          title={section.title}
          onSubmit={onEditSection}
        />
      )}
    </>
  );
}

export default Tasks;

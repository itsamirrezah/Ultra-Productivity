//imports
import { useLocation } from "react-router-dom";
import { VStack, Box, useDisclosure } from "@chakra-ui/react";
//components
import TaskItems from "../tasks/TaskItems";
import Header from "../tasks/Header";
import NavDrawer from "../side-nav/NavDrawer";
import CreateNewModal from "../UI/CreateNewModal";
import SearchTaskModal from "../search/SearchTaskModal";
//data & actions
import useTasks, { useDispatch } from "../../store/tasks-context";
import {
  addTask,
  editProject,
  editTag,
  addTaskTag,
  reorderTasks,
  reorderSubtasks,
} from "../../store/actions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Tasks() {
  const {
    isOpen: isNavOpen,
    onOpen: onOpenNav,
    onClose: onCloseNav,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  const {
    isOpen: isSearchModalOpen,
    onOpen: onOpenSearchModal,
    onClose: onCloseSearchModal,
  } = useDisclosure();

  const data = useTasks();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
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

  function onDragEnd(result) {
    const { destination, source, type } = result;
    if (!destination || !source) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    if (type === "task")
      dispatch(
        reorderTasks({ id, start: source.index, end: destination.index })
      );
    else if (type === "subtask")
      dispatch(
        reorderSubtasks({
          sourceId: source.droppableId,
          destinationId: destination.droppableId,
          start: source.index,
          end: destination.index,
        })
      );
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
          onOpenEditModal={onOpenEditModal}
          onOpenSearchModal={onOpenSearchModal}
          isEditable={section.id !== "today"}
          onAddTaskHandler={onAddTaskHandler}
        />
        <VStack w="full" spacing="1">
          {/* working status */}
          <Box>Working: 2h 3m</Box>
          {/* taskItems */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-task" type="task">
              {(provided) => (
                <VStack
                  w="full"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredTasks.map((task, index) => {
                    return (
                      <TaskItems
                        key={task.id}
                        task={task}
                        allTags={data.tags}
                        onAddTags={onAddTaskTagHandler}
                        index={index}
                      />
                    );
                  })}
                  {provided.placeholder}
                </VStack>
              )}
            </Droppable>
          </DragDropContext>
        </VStack>
      </VStack>
      <NavDrawer isOpen={isNavOpen} onClose={onCloseNav} />
      {isEditModalOpen && (
        <CreateNewModal
          header={`Edit ${section._}`}
          isOpen={isEditModalOpen}
          onClose={onCloseEditModal}
          type={section._}
          color={section.color}
          title={section.title}
          onSubmit={onEditSection}
        />
      )}

      {isSearchModalOpen && (
        <SearchTaskModal
          data={data}
          isOpen={isSearchModalOpen}
          onClose={onCloseSearchModal}
        />
      )}
    </>
  );
}

export default Tasks;

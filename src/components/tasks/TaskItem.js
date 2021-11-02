//imports
import React from "react";
import { HStack, Flex, Box, Input, Icon, IconButton } from "@chakra-ui/react";
import { FaGripLines } from "react-icons/fa";
import {
  FaUndo,
  FaPlay,
  FaPause,
  FaCheck,
  FaPlusSquare,
  FaTag,
  FaWindowClose,
} from "react-icons/fa";
//components
import TagItems from "../tags/TagItems";
//data
import { useDispatch } from "../../store/tasks-context";
import useActiveTask from "../../store/useActiveTask";
// actions
import {
  setTaskDone,
  addSubtask,
  removeTask,
  removeSubtask,
} from "../../store/actions";

function TaskItem({ task, props }) {
  const { id, title, isDone, tags, parentId } = task;
  const dispatch = useDispatch();
  const { activeTask, play, pause } = useActiveTask({ task: task });
  const isActive = activeTask.id === task.id;

  function setDoneHandler() {
    if (isActive) pause();
    dispatch(setTaskDone({ id, isDone: !isDone }));
  }

  function addSubtaskHandler() {
    dispatch(addSubtask({ parentId: id }));
  }

  function removeTaskHandler() {
    if (!parentId) dispatch(removeTask({ id }));
    else dispatch(removeSubtask({ id, parentId }));
  }

  return (
    <Box
      w="full"
      pos="relative"
      _hover={{
        "&:hover .task-item-actions": {
          visibility: "visible",
        },
      }}
      {...props}
    >
      {isDone && (
        <IconButton
          pos="absolute"
          zIndex="1"
          left="50%"
          top="50%"
          transform="translate(-50%,-50%)"
          variant="ghost"
          icon={<FaUndo />}
          onClick={setDoneHandler}
        />
      )}
      <Box
        pos="absolute"
        left="0"
        top="0"
        w="full"
        h="full"
        rounded="lg"
        bgColor={isActive ? "whiteAlpha.200" : "transparent"}
      ></Box>
      {/* actions */}
      <Flex
        className="task-item-actions"
        zIndex="1"
        pos="absolute"
        right="1"
        top="50%"
        visibility="hidden"
        transform="translateY(-50%)"
      >
        {isActive && !isDone && (
          <IconButton icon={<FaPause />} variant="ghost" onClick={pause} />
        )}
        {!isActive && !isDone && (
          <IconButton
            icon={<FaPlay />}
            variant="ghost"
            onClick={play.bind(null, task)}
          />
        )}

        {!isDone && (
          <IconButton
            icon={<FaCheck />}
            variant="ghost"
            onClick={setDoneHandler}
          />
        )}
        {!parentId && (
          <IconButton
            icon={<FaPlusSquare />}
            variant="ghost"
            onClick={addSubtaskHandler}
          />
        )}
        {!parentId && <IconButton icon={<FaTag />} variant="ghost" />}
        <IconButton
          icon={<FaWindowClose />}
          variant="ghost"
          onClick={removeTaskHandler}
        />
      </Flex>

      <HStack spacing="4" px="4" opacity={isDone ? 0.3 : 1}>
        <Box ms="2" cursor="grab">
          {isActive && <Icon as={FaPlay} fill="red.500" />}
          {!isActive && <Icon as={FaGripLines} fill="grey" cursor="grab" />}
        </Box>
        <Flex w="full" flexDir="column">
          <Input
            w="full"
            value={title}
            px="3"
            py="1"
            border="1px solid transparent"
            variant="unstyled"
            _focus={{
              bgColor: "blackAlpha.900",
              border: "1px solid",
              borderColor: "whiteAlpha.400",
              borderRadius: "md",
              transform: "scaleX(1.1)",
              zIndex: "10",
            }}
            transition="transform 123ms cubic-bezier(.4,0,1,1)"
          />
          {/* display tags if available */}
          {tags && <TagItems items={tags} />}
        </Flex>
      </HStack>
    </Box>
  );
}

function shouldNotRender(pProp, nProp) {
  const { task: pTask } = pProp;
  const { task: nTask } = nProp;

  return (
    pTask.isDone === nTask.isDone &&
    pTask.title === pTask.title &&
    pTask.subTaskIds.length === nTask.subTaskIds.length &&
    pTask.timeTracked === nTask.timeTracked &&
    pTask.tagIds.length === nTask.tagIds.length
  );
}

export default React.memo(TaskItem, shouldNotRender);

//imports
import { useState } from "react";
import {
  HStack,
  Flex,
  Box,
  Input,
  Icon,
  IconButton,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FaGripLines, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
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
import TagItem from "../tags/TagItem";
//data
import useActiveTask from "../../store/useActiveTask";
// actions
import {
  setTaskDone,
  addSubtask,
  removeTask,
  removeSubtask,
  addTaskToDay,
  removeTaskFromDay,
  setTaskTitle,
} from "../../store/actions";
import { relativeTime } from "../../utils/utils";
import EditTagModal from "./EditTagModal";

export default function TaskItem({ task, props, handleDrag }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id, title, isDone, tags, parentId } = task;
  const [input, setInput] = useState("");
  const { activeTask, play, pause, dispatch } = useActiveTask({ task: task });
  const isActive =
    activeTask.id === task.id || task.subTaskIds.includes(activeTask.id);
  const isToday = task.tagIds.includes("today");
  const timeTracked = isActive
    ? activeTask.timeTracked + task.timeTracked
    : task.timeTracked;
  const timeTrackedStr = relativeTime(timeTracked);

  function setTitleHandler() {
    if (input && title !== input) dispatch(setTaskTitle({ id, title: input }));
  }

  function setDoneHandler() {
    if (isActive || task.subTaskIds.includes(activeTask.id)) pause();
    dispatch(setTaskDone({ id, isDone: !isDone }));
  }

  function addSubtaskHandler() {
    dispatch(addSubtask({ parentId: id }));
  }

  function removeTaskHandler() {
    if (isActive || task.subTaskIds.includes(activeTask.id)) pause();
    if (!parentId) dispatch(removeTask({ id }));
    else dispatch(removeSubtask({ id, parentId }));
  }

  function addToDayHandler() {
    dispatch(addTaskToDay({ id: task.id }));
  }

  function removeFromDayHandler() {
    if (task.projectId || task.tagIds.length > 1)
      dispatch(removeTaskFromDay({ id: task.id }));
  }

  return (
    <>
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
          <Tooltip label="Revert">
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
          </Tooltip>
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
            <Tooltip label="Pause">
              <IconButton icon={<FaPause />} variant="ghost" onClick={pause} />
            </Tooltip>
          )}
          {!isActive && !isDone && (
            <Tooltip label="Start Tracking">
              <IconButton
                icon={<FaPlay />}
                variant="ghost"
                onClick={play.bind(null, task)}
              />
            </Tooltip>
          )}

          {!isDone && (
            <Tooltip label="Done Task">
              <IconButton
                icon={<FaCheck />}
                variant="ghost"
                onClick={setDoneHandler}
              />
            </Tooltip>
          )}

          {!parentId && isToday && (
            <Tooltip label="Remove From My Day">
              <IconButton
                icon={<FaMinusCircle />}
                variant="ghost"
                onClick={removeFromDayHandler}
              />
            </Tooltip>
          )}

          {!parentId && !isToday && (
            <Tooltip label="Add To My Day">
              <IconButton
                icon={<FaPlusCircle />}
                variant="ghost"
                onClick={addToDayHandler}
              />
            </Tooltip>
          )}

          {!parentId && (
            <Tooltip label="Add Subtask">
              <IconButton
                icon={<FaPlusSquare />}
                variant="ghost"
                onClick={addSubtaskHandler}
              />
            </Tooltip>
          )}
          {!parentId && (
            <Tooltip label="Edit Tags">
              <IconButton icon={<FaTag />} variant="ghost" onClick={onOpen} />
            </Tooltip>
          )}
          <Tooltip label="Delete Task">
            <IconButton
              icon={<FaWindowClose />}
              variant="ghost"
              onClick={removeTaskHandler}
            />
          </Tooltip>
        </Flex>

        <HStack spacing="4" px="4" opacity={isDone ? 0.3 : 1}>
          <Box ms="2" pos="relative" zIndex="10" {...handleDrag}>
            {isActive && <Icon as={FaPlay} fill="red.500" />}
            {!isActive && <Icon as={FaGripLines} fill="grey" />}
          </Box>
          <Flex w="full" flexDir="column">
            <Input
              w="full"
              value={input || title}
              onChange={(e) => setInput(e.target.value)}
              onBlur={setTitleHandler}
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
            {tags && (
              <Flex justifyContent="flex-start" gridGap={1}>
                {tags.map((tag) => (
                  <TagItem key={tag.id} tag={tag} size="md" />
                ))}
              </Flex>
            )}
          </Flex>
          <Box flexShrink="0" fontSize="sm">
            {timeTracked ? timeTrackedStr : "-"}
          </Box>
        </HStack>
      </Box>
      <EditTagModal isOpen={isOpen} onClose={onClose} task={task} />
    </>
  );
}

//imports
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
import useActiveTask from "../../store/useActiveTask";
//components
import TagItems from "../tags/TagItems";

function TaskItem({ task, props }) {
  const { title, isDone, tags, parentId } = task;
  const { activeTask, play, pause } = useActiveTask({ task: task });
  const isActive = activeTask.id === task.id;

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

        {!isDone && <IconButton icon={<FaCheck />} variant="ghost" />}
        {!parentId && <IconButton icon={<FaPlusSquare />} variant="ghost" />}
        {!parentId && <IconButton icon={<FaTag />} variant="ghost" />}
        <IconButton icon={<FaWindowClose />} variant="ghost" />
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

export default TaskItem;

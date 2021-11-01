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

function TaskItem({ task, subStyle }) {
  const { title, isDone, tags, parentId } = task;
  const { activeTask, play, pause } = useActiveTask({ task: task });
  return (
    <Box
      w="full"
      pos="relative"
      {...subStyle}
      _hover={{
        "&:hover .task-item-actions": {
          visibility: "visible",
        },
      }}
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
      <Flex
        className="task-item-actions"
        zIndex="1"
        pos="absolute"
        right="1"
        top="50%"
        visibility="hidden"
        transform="translateY(-50%)"
      >
        {!isDone && (
          <>
            <IconButton
              icon={<FaPlay />}
              fill="white"
              variant="ghost"
              onClick={play.bind(null, task)}
            />
            <IconButton
              icon={<FaPause />}
              fill="white"
              variant="ghost"
              onClick={pause}
            />
          </>
        )}
        {!isDone && (
          <IconButton icon={<FaCheck />} fill="white" variant="ghost" />
        )}
        {!parentId && (
          <IconButton icon={<FaPlusSquare />} fill="white" variant="ghost" />
        )}
        {!parentId && (
          <IconButton icon={<FaTag />} fill="white" variant="ghost" />
        )}
        <IconButton icon={<FaWindowClose />} fill="white" variant="ghost" />
      </Flex>

      <HStack spacing="4" px="4" opacity={isDone ? 0.3 : 1}>
        <Box ms="2">
          <Icon
            as={FaGripLines}
            fill="grey"
            cursor="grab"
            //  size="xs"
          />
        </Box>
        <Flex w="full" flexDir="column">
          <Input
            w="full"
            value={`${title}`}
            px="0"
            py="0.5"
            border="1px solid transparent"
            variant="unstyled"
          />
          {/* display tags if available */}
          {tags && <TagItems items={tags} />}
        </Flex>
      </HStack>
    </Box>
  );
}

export default TaskItem;

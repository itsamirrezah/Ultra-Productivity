import { VStack, IconButton, HStack, Text, Icon } from "@chakra-ui/react";
import TaskList from "./TaskList";
import { FaMinus, FaPlus, FaAngleDown } from "react-icons/fa";
import { useState } from "react";

export default function Subtasks({
  subtasks,
  droppableProps,
  innerRef,
  droppablePlaceHolder,
}) {
  const [isCollapsedMode, setCollapseMode] = useState(false);
  const uiTasks = isCollapsedMode
    ? subtasks.filter((subtask) => !subtask.isDone)
    : subtasks;

  const hiddenBtnShown = uiTasks.find((t) => t.isDone);

  return (
    <VStack
      alignSelf="flex-end"
      py="1"
      mt="0"
      spacing="0.5"
      w="95%"
      pos="relative"
      {...droppableProps}
      ref={innerRef}
    >
      {hiddenBtnShown && (
        <IconButton
          onClick={() => setCollapseMode((state) => !state)}
          size="xs"
          boxSize={4}
          rounded="lg"
          pos="absolute"
          right="100%"
          top="50%"
          zIndex="10"
          transform="translateX(50%)"
          icon={isCollapsedMode ? <FaPlus /> : <FaMinus />}
        />
      )}
      {isCollapsedMode && (
        <HStack
          cursor="pointer"
          w="full"
          justifyContent="center"
          onClick={() => setCollapseMode((state) => !state)}
        >
          <Text textTransform="uppercase" fontSize="md">{`+${
            subtasks.length - uiTasks.length
          } Done Tasks`}</Text>
          <Icon as={FaAngleDown} />
        </HStack>
      )}

      <TaskList tasks={uiTasks} type="subtask" />
      {droppablePlaceHolder}
    </VStack>
  );
}

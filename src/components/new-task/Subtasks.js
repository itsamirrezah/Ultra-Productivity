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
  const doneTasks = subtasks.filter((subtask) => subtask.isDone);

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
      {doneTasks.length > 0 && !isCollapsedMode && (
        <IconButton
          onClick={() => setCollapseMode((state) => !state)}
          size="xs"
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
          <Text
            textTransform="uppercase"
            fontSize="md"
          >{`+${doneTasks.length} Done Tasks`}</Text>
          <Icon as={FaAngleDown} />
        </HStack>
      )}

      <TaskList tasks={subtasks} type="subtask" />
      {droppablePlaceHolder}
    </VStack>
  );
}

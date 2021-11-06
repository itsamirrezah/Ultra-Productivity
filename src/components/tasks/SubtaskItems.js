//imports
import { VStack, IconButton, Collapse } from "@chakra-ui/react";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
//components
import TaskItem from "./TaskItem";

function SubtaskItems({ items }) {
  const [isCollapse, setCollapse] = useState(false);

  return (
    <VStack
      w="95%"
      alignSelf="flex-end"
      spacing="0.5"
      pt="4"
      pb="2"
      pos="relative"
    >
      <IconButton
        onClick={() => setCollapse((state) => !state)}
        size="xs"
        rounded="lg"
        pos="absolute"
        right="100%"
        top="50%"
        transform="translateY(-50%)"
        icon={isCollapse ? <FaPlus /> : <FaMinus />}
      />

      {items &&
        items.map((subtask) => {
          const taskItem = (
            <TaskItem
              task={subtask}
              props={{
                alignSelf: "flex-end",
                bgColor: "whiteAlpha.200",
                py: "1",
              }}
            />
          );

          return (
            <Collapse
              key={subtask.id}
              in={isCollapse ? !subtask.isDone : true}
              style={{ width: "100%" }}
            >
              {taskItem}
            </Collapse>
          );
        })}
    </VStack>
  );
}

export default SubtaskItems;

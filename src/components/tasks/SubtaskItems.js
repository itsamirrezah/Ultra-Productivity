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
              subStyle={{
                alignSelf: "flex-end",
                bgColor: "rgba(255,255,255,0.1)",
                py: "1",
                rounded: "md",
              }}
            />
          );

          if (subtask.isDone)
            return (
              <Collapse
                key={subtask.id}
                in={!isCollapse}
                style={{ width: "100%" }}
              >
                {taskItem}
              </Collapse>
            );
          return taskItem;
        })}
    </VStack>
  );
}

export default SubtaskItems;

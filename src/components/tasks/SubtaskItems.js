//imports
import {
  VStack,
  IconButton,
  Collapse,
  Box,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { FaMinus, FaPlus, FaAngleDown } from "react-icons/fa";
//components
import TaskItem from "./TaskItem";

function SubtaskItems({ items, parentId }) {
  const [isCollapse, setCollapse] = useState(false);

  const doneTasks = items.filter((subtask) => subtask.isDone);

  return (
    <Box pos="relative" w="95%" alignSelf="flex-end" pt="4" pb="2">
      {doneTasks.length > 0 && !isCollapse && (
        <IconButton
          onClick={() => setCollapse((state) => !state)}
          size="xs"
          rounded="lg"
          pos="absolute"
          right="100%"
          top="50%"
          zIndex="10"
          transform="translateX(50%)"
          icon={isCollapse ? <FaPlus /> : <FaMinus />}
        />
      )}
      {isCollapse && (
        <HStack
          cursor="pointer"
          w="full"
          justifyContent="center"
          onClick={() => setCollapse((state) => !state)}
        >
          <Text
            textTransform="uppercase"
            fontSize="md"
          >{`+${doneTasks.length} Done Tasks`}</Text>
          <Icon as={FaAngleDown} />
        </HStack>
      )}

      <Droppable droppableId={parentId} type="subtask">
        {(provided) => (
          <VStack
            spacing="0.5"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {items &&
              items.map((subtask, index) => (
                <Collapse
                  key={subtask.id}
                  in={isCollapse ? !subtask.isDone : true}
                  style={{ width: "100%" }}
                >
                  <Draggable draggableId={subtask.id} index={index}>
                    {(provided) => (
                      <Box
                        w="full"
                        m="0"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <TaskItem
                          task={subtask}
                          props={{
                            alignSelf: "flex-end",
                            bgColor: "whiteAlpha.200",
                            py: "1",
                            mt: "0",
                          }}
                          handleDrag={provided.dragHandleProps}
                        />
                      </Box>
                    )}
                  </Draggable>
                </Collapse>
              ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
    </Box>
  );
}

export default SubtaskItems;

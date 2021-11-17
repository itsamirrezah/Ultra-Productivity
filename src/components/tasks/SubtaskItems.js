//imports
import { VStack, IconButton, Collapse, Box } from "@chakra-ui/react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
//components
import TaskItem from "./TaskItem";

function SubtaskItems({ items }) {
  const [isCollapse, setCollapse] = useState(false);

  return (
    <Box pos="relative" w="95%" alignSelf="flex-end" pt="4" pb="2">
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

      <Droppable droppableId={items[0].parentId} type="subtask">
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

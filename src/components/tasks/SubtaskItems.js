//imports
import { VStack, IconButton, Collapse, Box } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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

      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="subtask-droppable">
          {(provided) => (
            <VStack
              spacing="0.5"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items &&
                items.map((subtask, index) => (
                  <Draggable
                    key={subtask.id}
                    draggableId={subtask.id + "12"}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        w="full"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <Collapse
                          in={isCollapse ? !subtask.isDone : true}
                          style={{ width: "100%" }}
                        >
                          <TaskItem
                            task={subtask}
                            props={{
                              // alignSelf: "flex-end",
                              bgColor: "whiteAlpha.200",
                              py: "1",
                            }}
                            handleDrag={provided.dragHandleProps}
                          />
                        </Collapse>
                      </Box>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </VStack>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}

export default SubtaskItems;

import { Box, VStack } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import Task from "./Task";

function TaskList({ tasks, type }) {
  return (
    <AnimatePresence initial={false}>
      {tasks.map((t, i) => {
        if (type === "task")
          return (
            <Draggable draggableId={t.id} index={i} key={t.id}>
              {(provided) => (
                <NewBox width="full" maxW="4xl">
                  <VStack
                    rounded="lg"
                    width="full"
                    bgColor="blackAlpha.600"
                    spacing="1"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <Task
                      key={t.id}
                      task={t}
                      type={type}
                      handleDrag={provided.dragHandleProps}
                    />
                  </VStack>
                </NewBox>
              )}
            </Draggable>
          );

        return (
          <Draggable key={t.id} draggableId={t.id} index={i}>
            {(provided) => (
              <NewBox width="full">
                <Box
                  width="full"
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  <Task
                    task={t}
                    type={type}
                    handleDrag={provided.dragHandleProps}
                  />
                </Box>
              </NewBox>
            )}
          </Draggable>
        );
      })}
    </AnimatePresence>
  );
}

export default memo(TaskList, (prev, next) => {
  if (prev.tasks === next.tasks) {
    return true;
  }
  return false;
});

const MotionBox = motion(Box);

export function NewBox({ children, ...props }) {
  return (
    <MotionBox
      {...props}
      initial={{ opacity: 0, width: "0%" }}
      animate={{ opacity: 1, width: "100%" }}
      exit={{ opacity: 0, width: "0%" }}
    >
      {children}
    </MotionBox>
  );
}

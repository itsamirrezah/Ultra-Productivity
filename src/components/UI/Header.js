//imports
import {
  HStack,
  Box,
  IconButton,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BsListNested } from "react-icons/bs";
import { FaPause, FaPlay, FaPlus, FaSearch, FaEllipsisV } from "react-icons/fa";
//data
import useActiveTask from "../../store/useActiveTask";
//action

function Header({
  availableTask,
  title,
  onOpenNav,
  onOpenModal,
  isEditable,
  onAddTaskHandler,
}) {
  const { activeTask, play, pause } = useActiveTask({ shouldObserve: true });

  function startTracking() {
    const task = availableTask();
    if (task) play(task);
  }

  return (
    <>
      <HStack
        w="full"
        justifyContent="space-between"
        sx={{
          "&:hover .active-task-box": {
            visibility: "hidden",
          },
          "&:hover .edit-icon": {
            visibility: "visible",
          },
        }}
      >
        <HStack spacing="0" alignItems="baseline">
          <IconButton
            variant="link"
            display={["inherit", "inherit", "none"]}
            icon={<BsListNested />}
            onClick={onOpenNav}
          />
          <Heading fontSize="xx-large">{title}</Heading>
          {isEditable && (
            <IconButton
              visibility="hidden"
              className="edit-icon"
              variant="link"
              icon={<FaEllipsisV />}
              onClick={onOpenModal}
            />
          )}
        </HStack>

        <HStack>
          <Tooltip label="Add Task">
            <IconButton
              icon={<FaPlus />}
              variant="ghost"
              onClick={onAddTaskHandler}
            />
          </Tooltip>
          <Tooltip label="Search">
            <IconButton icon={<FaSearch />} variant="ghost" />
          </Tooltip>
          <Box pos="relative">
            {activeTask.id && (
              <Box
                className="active-task-box"
                pos="absolute"
                right="100%"
                top="50%"
                bgColor="#333"
                transform="translateY(-50%)"
                borderColor="red"
                borderWidth="1px"
                borderRadius="xl"
                px="4"
                py="1.5"
                pr="10"
                mr="-9"
              >
                <Text
                  maxW="9rem"
                  whiteSpace="nowrap"
                  fontSize="sm"
                  textOverflow="ellipsis"
                  overflow="hidden"
                >
                  {activeTask.title}
                </Text>
              </Box>
            )}
            <Tooltip label={activeTask.id ? "Pause" : "Start Tracking"}>
              <IconButton
                onClick={activeTask.id ? pause : startTracking}
                borderRadius="full"
                variant="outline"
                bgColor={!activeTask.id ? "blue.800" : "red.800"}
                icon={activeTask.id ? <FaPause /> : <FaPlay />}
              />
            </Tooltip>
          </Box>
        </HStack>
      </HStack>
    </>
  );
}

export default Header;

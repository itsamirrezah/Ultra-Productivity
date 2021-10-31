//imports
import {
  HStack,
  Box,
  IconButton,
  Heading,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { BsListNested } from "react-icons/bs";
import { FaPause, FaPlay, FaPlus, FaSearch } from "react-icons/fa";
//components
import NavDrawer from "../side-nav/NavDrawer";
//data
import useActiveTask from "../../store/useActiveTask";

function Header() {
  const { activeTask, play, pause } = useActiveTask({ shouldObserve: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        w="full"
        justifyContent="space-between"
        sx={{
          "&:hover .active-task-box": {
            visibility: "hidden",
          },
        }}
      >
        <HStack spacing="0">
          <IconButton
            // size="md"
            variant="link"
            display={["inherit", "inherit", "none"]}
            icon={<BsListNested />}
            onClick={onOpen}
          />
          <Heading fontSize="xx-large">{`Overview`}</Heading>
        </HStack>

        <HStack>
          <IconButton icon={<FaPlus />} variant="ghost" />
          <IconButton icon={<FaSearch />} variant="ghost" />
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
            <IconButton
              onClick={activeTask.id ? pause : play}
              borderRadius="full"
              variant="outline"
              bgColor={!activeTask.id ? "blue.800" : "red.800"}
              icon={activeTask.id ? <FaPause /> : <FaPlay />}
            />
          </Box>
        </HStack>
      </HStack>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Header;

//imports
import {
  HStack,
  IconButton,
  Heading,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { BsListNested } from "react-icons/bs";
import { FaPlus, FaSearch } from "react-icons/fa";
//components
import NavDrawer from "../side-nav/NavDrawer";
//data
import useActiveTask from "../../store/useActiveTask";

function Header() {
  const { activeTask } = useActiveTask({ shouldObserve: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack w="full" justifyContent="space-between">
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
          <Text>{activeTask.title}</Text>
        </HStack>
      </HStack>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Header;

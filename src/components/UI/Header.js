import { HStack, IconButton, Heading, useDisclosure } from "@chakra-ui/react";
import { BsListNested } from "react-icons/bs";
import { FaPlus, FaSearch } from "react-icons/fa";
import NavDrawer from "../side-nav/NavDrawer";

function Header() {
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
        </HStack>
      </HStack>

      <NavDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Header;

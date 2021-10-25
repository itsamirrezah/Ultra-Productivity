import { HStack, IconButton, Heading } from "@chakra-ui/react";
import { BsListNested } from "react-icons/bs";
import { FaPlus, FaSearch } from "react-icons/fa";

function Header() {
  return (
    <HStack w="full" justifyContent="space-between">
      <HStack spacing="0">
        <IconButton size="md" variant="unstyled" icon={<BsListNested />} />
        <Heading fontSize="xx-large">{`Overview`}</Heading>
      </HStack>

      <HStack>
        <IconButton icon={<FaPlus />} variant="ghost" />
        <IconButton icon={<FaSearch />} variant="ghost" />
      </HStack>
    </HStack>
  );
}

export default Header;

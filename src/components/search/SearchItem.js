import { HStack, Text } from "@chakra-ui/react";
import ColorItem from "../colors/ColorItem";

function SearchItem({ color, title, onClick }) {
  return (
    <HStack
      cursor="pointer"
      minH="12"
      px="4"
      py="2"
      _hover={{ bgColor: "whiteAlpha.200" }}
      onClick={onClick}
    >
      <ColorItem color={color} />
      <Text>{title}</Text>
    </HStack>
  );
}

export default SearchItem;

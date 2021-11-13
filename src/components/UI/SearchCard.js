import { Flex } from "@chakra-ui/react";

function SearchCard({ children }) {
  return (
    <Flex
      w="full"
      flexDir="column"
      maxH="80"
      overflow="scroll"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        "&": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      }}
      pos="absolute"
      zIndex="10"
      top="120%"
      left="0"
      bgColor="#453643"
      className="search-box"
    >
      {children}
    </Flex>
  );
}
export default SearchCard;

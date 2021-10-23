//imports
import { VStack } from "@chakra-ui/react";
//components
import NavItems from "./NavItems";

function Navigation({ items }) {
  return (
    <VStack
      width="full"
      minH="100vh"
      pt={8}
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
      flexShrink={0}
      bgColor="#28112B"
    >
      {/* logo or something */}
      {/* navigation items */}
      <NavItems items={items} />
    </VStack>
  );
}

export default Navigation;

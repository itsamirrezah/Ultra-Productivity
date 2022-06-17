//imports
import { VStack } from "@chakra-ui/react";
import Logo from "../UI/Logo";
//components
import NavItems from "./NavItems";
//data

function Navigation() {
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
      <Logo />
      <NavItems />
    </VStack>
  );
}

export default Navigation;

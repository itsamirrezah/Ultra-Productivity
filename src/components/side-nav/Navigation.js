//imports
import { VStack } from "@chakra-ui/react";
import Logo from "../UI/Logo";
//components
import NavItems from "./NavItems";
//data
import navigationData from "../../data/nav-data";

function Navigation() {
  const items = navigationData();

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
      <Logo />
      {/* navigation items */}
      <NavItems items={items} />
    </VStack>
  );
}

export default Navigation;

//imports
import { VStack } from "@chakra-ui/react";
import Logo from "../UI/Logo";
//components
import NavItems from "./NavItems";
//data
import useTasks from "../../store/tasks-context";
import navigationData from "../../data/nav-data";

function Navigation() {
  const navData = useTasks();
  const items = navigationData(navData);

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

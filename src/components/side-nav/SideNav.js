//import
import { Flex } from "@chakra-ui/react";
//components
import Navigation from "./Navigation";

function SideNav() {
  return (
    <Flex
      as="side"
      width="full"
      maxWidth={56}
      flexShrink={0}
      borderRightWidth={2}
      display={["none", "none", "inherit"]}
      borderRightColor="color.gray"
    >
      <Navigation />
    </Flex>
  );
}

export default SideNav;

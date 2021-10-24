//import
import { Flex } from "@chakra-ui/react";
//components
import Navigation from "./Navigation";
//data
import { navigationData } from "../../data/nav-data";

function SideNav() {
  // load navigation data with dummy
  const navData = navigationData();

  return (
    <Flex
      as="side"
      width="full"
      maxWidth={56}
      flexShrink={0}
      borderRightWidth={2}
      //   display={["none", "none", "inherit"]}
      borderRightColor="color.gray"
    >
      <Navigation items={navData} />
    </Flex>
  );
}

export default SideNav;

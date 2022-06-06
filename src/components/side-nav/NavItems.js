//imports
import { VStack, Link as ChakraLink, Divider } from "@chakra-ui/react";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import useTasks from "../../store/tasks-context";

//components
import AccordionItems from "./AccordionItems";
import BasicItem from "./BasicItem";

function NavItems() {
  const { navigation } = useTasks();
  const location = useLocation().pathname;
  return (
    <VStack w="full">
      {navigation &&
        navigation.map((item, idx) => {
          if (item.type === 0) {
            //basic navigation item
            return (
              <Fragment key={item.id}>
                <ChakraLink
                  as={Link}
                  style={{ textDecoration: "none" }}
                  to={item.link}
                  w="full"
                >
                  <BasicItem
                    text={item.text}
                    icon={<item.icon />}
                    isSelected={location === item.link}
                  />
                </ChakraLink>
                {navigation.length !== idx + 1 && <Divider />}
              </Fragment>
            );
          }

          if (item.type === 1) {
            //accordion items (projects & tags)
            return (
              <Fragment key={item.id}>
                <AccordionItems
                  key={item.id}
                  items={item.items}
                  location={location}
                />
                {navigation.length !== idx + 1 && <Divider />}
              </Fragment>
            );
          }
        })}
    </VStack>
  );
}

export default NavItems;

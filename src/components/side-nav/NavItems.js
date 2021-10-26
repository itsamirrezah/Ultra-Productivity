//imports
import { VStack, Link as ChakraLink, Divider } from "@chakra-ui/react";
import { Link } from "react-router-dom";

//components
import AccordionItems from "./AccordionItems";
import BasicItem from "./BasicItem";

function NavItems({ items }) {
  return (
    <VStack w="full">
      {items &&
        items.map((item, idx) => {
          if (item.type === 0) {
            //basic navigation item
            return (
              <>
                <ChakraLink
                  as={Link}
                  style={{ textDecoration: "none" }}
                  to={item.link}
                  w="full"
                >
                  <BasicItem text={item.text} icon={<item.icon />} />
                </ChakraLink>
                {items.length !== idx + 1 && <Divider />}
              </>
            );
          }

          if (item.type === 1) {
            //accordion items (projects & tags)
            return (
              <>
                <AccordionItems items={item.items} />
                {items.length !== idx + 1 && <Divider />}
              </>
            );
          }
        })}
    </VStack>
  );
}

export default NavItems;

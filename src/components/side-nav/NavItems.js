//imports
import { VStack } from "@chakra-ui/react";
//components
import AccordionItems from "./AccordionItems";
import BasicItem from "./BasicItem";

function NavItems({ items }) {
  return (
    <VStack w="full">
      {items &&
        items.map((item) => {
          if (item.type === 0) {
            //basic navigation item
            return <BasicItem text={item.text} />;
          }

          if (item.type === 1) {
            //accordion items (projects & tags)
            return <AccordionItems items={item.items} />;
          }
        })}
    </VStack>
  );
}

export default NavItems;

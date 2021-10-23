//imports
import {
  AccordionItem as ChAccordionItem,
  AccordionButton,
} from "@chakra-ui/react";
import BasicItem from "./BasicItem";
function AccordionSection({ text, children }) {
  return (
    <ChAccordionItem>
      <AccordionButton
        p="0"
        _focus={{ boxShadow: "none", bgColor: "transparent" }}
      >
        <BasicItem text={text} />
      </AccordionButton>
      {children}
    </ChAccordionItem>
  );
}

export default AccordionSection;

//imports
import {
  AccordionItem as ChAccordionItem,
  AccordionButton,
} from "@chakra-ui/react";
import BasicItem from "./BasicItem";
function AccordionSection({ text, icon, children }) {
  return (
    <ChAccordionItem>
      <AccordionButton
        p="0"
        _focus={{ boxShadow: "none", bgColor: "transparent" }}
      >
        <BasicItem text={text} icon={icon} />
      </AccordionButton>
      {children}
    </ChAccordionItem>
  );
}

export default AccordionSection;

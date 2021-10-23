//imports
import { Accordion, AccordionPanel } from "@chakra-ui/react";
import AccordionItem from "./AccordionItem";
//components
import AccordionSection from "./AccordionSection";

function AccordionItems({ items }) {
  return (
    <Accordion allowMultiple borderColor="transparent" w="full">
      {items.map((it) => {
        return (
          <AccordionSection key={it.text} text={it.text}>
            <AccordionPanel p="0">
              {Object.keys(it.list).map((id, idx) => {
                const item = it.list[id];
                return <AccordionItem key={idx} title={item.title} />;
              })}
            </AccordionPanel>
          </AccordionSection>
        );
      })}
    </Accordion>
  );
}

export default AccordionItems;

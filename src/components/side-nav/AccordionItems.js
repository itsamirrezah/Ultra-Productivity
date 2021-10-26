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
          <AccordionSection key={it.text} text={it.text} icon={<it.icon />}>
            <AccordionPanel p="0" bgColor="rgba(255,255,255,0.03)">
              {Object.keys(it.list).map((id, idx) => {
                const item = it.list[id];
                if (item.type < 0) return;
                return (
                  <AccordionItem
                    key={idx}
                    title={item.title}
                    color={item.color}
                    link={`${it.route}/${item.id}`}
                  />
                );
              })}
            </AccordionPanel>
          </AccordionSection>
        );
      })}
    </Accordion>
  );
}

export default AccordionItems;

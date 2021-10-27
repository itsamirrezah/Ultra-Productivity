//imports
import { Accordion, AccordionPanel } from "@chakra-ui/react";
import CreateNewButton from "../UI/CreateNewButton";
import AccordionItem from "./AccordionItem";
//components
import AccordionSection from "./AccordionSection";

function AccordionItems({ items, location }) {
  return (
    <Accordion allowMultiple borderColor="transparent" w="full">
      {items.map((it) => {
        return (
          <AccordionSection
            key={it.text}
            text={`${it.text}s`}
            icon={<it.icon />}
          >
            <AccordionPanel p="0" bgColor="rgba(255,255,255,0.03)">
              {Object.keys(it.list).map((id) => {
                const item = it.list[id];
                if (item.type < 0) return;
                return (
                  <AccordionItem
                    key={id}
                    title={item.title}
                    color={item.color}
                    link={`${it.route}/${item.id}`}
                    isSelected={location === `${it.route}/${item.id}`}
                  />
                );
              })}
              <CreateNewButton data={it} />
            </AccordionPanel>
          </AccordionSection>
        );
      })}
    </Accordion>
  );
}

export default AccordionItems;

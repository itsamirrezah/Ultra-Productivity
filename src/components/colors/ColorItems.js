//imports
import { HStack } from "@chakra-ui/react";
import ColorItem from "./ColorItem";
//components

function ColorItems({ items, currentColor, setColor }) {
  return (
    <HStack spacing="2">
      {Object.keys(items).map((id) => {
        const color = items[id];
        const isSelected = currentColor ? color === currentColor : 0;
        return (
          <ColorItem
            key={id}
            color={color}
            isSelected={isSelected}
            onClick={() => setColor(color)}
          />
        );
      })}
    </HStack>
  );
}

export default ColorItems;

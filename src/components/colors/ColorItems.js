//imports
import { HStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
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
            icon={isSelected ? FaCheck : null}
            onClick={() => setColor(color)}
          />
        );
      })}
    </HStack>
  );
}

export default ColorItems;

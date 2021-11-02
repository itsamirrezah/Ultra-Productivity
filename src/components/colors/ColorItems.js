import { HStack, Circle } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

function ColorItems({ items, currentColor, setColor }) {
  return (
    <HStack spacing="2">
      {Object.keys(items).map((id) => {
        const color = items[id];
        const isSelected = currentColor ? color === currentColor : 0;
        return (
          <Circle
            key={id}
            size="25px"
            bg={`${color}.600`}
            cursor="pointer"
            onClick={() => setColor(color)}
          >
            {isSelected ? <FaCheck size="12" /> : null}
          </Circle>
        );
      })}
    </HStack>
  );
}

export default ColorItems;

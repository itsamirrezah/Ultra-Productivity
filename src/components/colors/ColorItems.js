//imports
import { HStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import ColorItem from "./ColorItem";
//components
import { colors } from "../../data/app-data";

function ColorItems({ currentColor, setColor }) {
  return (
    <HStack spacing="2">
      {Object.keys(colors).map((id) => {
        const color = colors[id];
        const isSelected = color === currentColor ? true : false;
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

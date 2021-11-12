import { Circle } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

function ColorItem({ color, isSelected, onClick }) {
  return (
    <Circle
      size="25px"
      bg={`${color}.600`}
      cursor="pointer"
      onClick={onClick ? onClick : null}
    >
      {isSelected ? <FaCheck size="12" /> : null}
    </Circle>
  );
}
export default ColorItem;

import { Circle } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

function ColorItem({ icon, color, isSelected, onClick }) {
  const Icon = icon;
  return (
    <Circle
      size="25px"
      bg={`${color}.600`}
      cursor="pointer"
      onClick={onClick ? onClick : null}
    >
      {isSelected && <FaCheck size="12" />}
      {icon && <Icon size="12" />}
    </Circle>
  );
}
export default ColorItem;

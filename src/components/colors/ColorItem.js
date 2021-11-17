import { Circle } from "@chakra-ui/react";

function ColorItem({ icon, color, onClick }) {
  const Icon = icon;
  return (
    <Circle
      size="25px"
      bg={`${color}.600`}
      cursor="pointer"
      onClick={onClick ? onClick : null}
    >
      {icon && <Icon size="12" />}
    </Circle>
  );
}
export default ColorItem;

import { HStack, Circle } from "@chakra-ui/react";

function ColorItems({ items }) {
  return (
    <HStack spacing="2">
      {Object.keys(items).map((id) => {
        const color = items[id];
        return (
          <Circle
            key={id}
            size="25px"
            bg={`${color}.400`}
            cursor="pointer"
          ></Circle>
        );
      })}
    </HStack>
  );
}

export default ColorItems;

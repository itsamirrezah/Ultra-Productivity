import { Link as ChakraLink, HStack, Heading } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";
function AccordionItem({ title, link, color, isSelected }) {
  const activeStyle = {
    bg: "rgba(255, 255, 255, 0.1)",
    borderLeftWidth: "7px",
    borderLeftStyle: "solid",
    borderLeftColor: color,
  };
  const selectedStyle = isSelected ? activeStyle : null;

  return (
    <ChakraLink
      as={Link}
      to={link}
      display="inline-block"
      style={{ textDecoration: "none" }}
      my="1"
      width="full"
    >
      <HStack
        height="2.5rem"
        justifyContent="space-between"
        borderLeftRadius="lg"
        pl="8"
        borderLeft="3px solid transparent"
        _hover={activeStyle}
        {...selectedStyle}
      >
        <Heading
          overflow="hidden"
          fontSize="sm"
          fontWeight="bold"
          whiteSpace="nowrap"
          letterSpacing={1}
          maxWidth="8rem"
          textOverflow="ellipsis"
        >
          {title}
        </Heading>
      </HStack>
    </ChakraLink>
  );
}

export default memo(AccordionItem, (prev, next) => {
  if (prev.updatedAt === next.updatedAt && prev.isSelected === next.isSelected)
    return true;
  return false;
});

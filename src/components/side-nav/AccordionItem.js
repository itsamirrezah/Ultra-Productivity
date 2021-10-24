import { Link as ChakraLink, HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function AccordionItem({ title, link, color }) {
  return (
    <ChakraLink
      as={Link}
      to={link}
      display="inline-block"
      style={{ textDecoration: "none" }}
      my="1"
      borderLeft="3px solid transparent"
      width="full"
    >
      <HStack
        height="2.5rem"
        justifyContent="space-between"
        borderLeftRadius="lg"
        pl="8"
        _hover={{
          bgColor: "rgba(255,255,255,0.1)",
          borderLeftWidth: "7px",
          borderLeftStyle: "solid",
          borderLeftColor: color,
        }}
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

export default AccordionItem;

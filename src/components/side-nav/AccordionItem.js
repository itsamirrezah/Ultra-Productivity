import { Link as ChakraLink, HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
function AccordionItem({ title, link }) {
  return (
    <ChakraLink
      as={Link}
      to={link}
      display="inline-block"
      my="0.25"
      borderLeft="3px solid transparent"
      width="full"
    >
      <HStack
        height="2.5rem"
        justifyContent="space-between"
        borderLeftRadius="lg"
        pl="8"
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

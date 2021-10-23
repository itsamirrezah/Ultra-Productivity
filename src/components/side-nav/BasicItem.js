import { Link as ChakraLink, HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function BasicItem({ text, icon }) {
  return (
    <ChakraLink as={Link}>
      <HStack
        p="4"
        borderRadius="lg"
        spacing={5}
        w="full"
        role="group"
        color="#fff"
      >
        {/* <item.icon /> */}
        <Heading fontSize="lg" fontWeight="bold" letterSpacing={2}>
          {text}
        </Heading>
      </HStack>
    </ChakraLink>
  );
}

export default BasicItem;

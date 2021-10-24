import { HStack, Heading } from "@chakra-ui/react";

function BasicItem({ text, icon }) {
  return (
    <HStack
      p="4"
      borderRadius="lg"
      spacing={5}
      w="full"
      role="group"
      _hover={{
        bgColor: "rgba(255,255,255,0.1)",
      }}
      transition="all 0.2s"
      transitionTimingFunction="ease-in"
    >
      {icon}
      <Heading fontSize="lg" fontWeight="bold" letterSpacing={2}>
        {text}
      </Heading>
    </HStack>
  );
}

export default BasicItem;

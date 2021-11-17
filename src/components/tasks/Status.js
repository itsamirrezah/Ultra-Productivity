import { HStack, Text } from "@chakra-ui/react";
import { FaRegClock } from "react-icons/fa";

function Status({ time }) {
  return (
    <HStack w="full" spacing={1} p={2} justifyContent="center">
      <Text fontSize="sm" letterSpacing="wide">
        Working:
      </Text>
      <Text fontSize="sm" fontWeight="bold" letterSpacing="wide">
        {time}
      </Text>
      <FaRegClock size={15} />
    </HStack>
  );
}
export default Status;

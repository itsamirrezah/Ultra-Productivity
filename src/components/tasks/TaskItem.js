//imports
import { HStack, Flex, Box, Input, Icon } from "@chakra-ui/react";
import { FaGripLines } from "react-icons/fa";

function TaskItem({ task, subStyle }) {
  const { title, tags } = task;
  return (
    <HStack spacing="4" w="full" px="4" {...subStyle}>
      <Box ms="2">
        <Icon as={FaGripLines} fill="grey" cursor="grab" size="xs" />
      </Box>
      <Flex w="full" flexDir="column" alignItems="flex-start">
        <Input
          w="full"
          value={`${title}`}
          px="0"
          py="0.5"
          border="1px solid transparent"
          variant="unstyled"
        />
        {/* display tags if available */}
      </Flex>
    </HStack>
  );
}

export default TaskItem;

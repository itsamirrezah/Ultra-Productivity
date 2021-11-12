import { useRef, useState } from "react";
import {
  Box,
  Input,
  HStack,
  useOutsideClick,
  Flex,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import ColorItem from "../colors/ColorItem";

function SearchModal({ isOpen, onClose, data }) {
  const [isSearchBox, setSearchBox] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const ref = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => setSearchBox(false),
  });

  function search(e) {
    const input = e.target.value;
    setSearchResult(input);
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title="Search Tasks">
      <Box pos="relative" ref={ref}>
        <Input
          w="full"
          variant="unstyled"
          width="44"
          flexGrow="1"
          onChange={search}
          borderBottom="2px solid gray"
          value={searchResult}
          onFocus={() => setSearchBox(true)}
        />

        {isSearchBox && (
          <Flex
            w="full"
            flexDir="column"
            maxH="80"
            overflow="scroll"
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              "&": {
                "-ms-overflow-style": "none",
                "scrollbar-width": "none",
              },
            }}
            pos="absolute"
            zIndex="10"
            top="120%"
            left="0"
            bgColor="#453643"
            className="search-box"
          >
            {Object.keys(data.tasks).map((id) => {
              const task = data.tasks[id];
              if (searchResult && task.title.search(searchResult) < 0) return;
              const t = data.tasks[task.parentId || task.id];
              const projectOrTag = t.projectId
                ? data.projects[t.projectId]
                : data.tags[t.tagIds[0]];

              return (
                <ChakraLink
                  as={Link}
                  to={`${t.projectId ? "/projects/" : "/tags/"}${
                    projectOrTag.id
                  }`}
                  key={task.id}
                >
                  <HStack
                    cursor="pointer"
                    minH="12"
                    px="4"
                    py="2"
                    _hover={{ bgColor: "whiteAlpha.200" }}
                  >
                    <ColorItem color={projectOrTag.color} />
                    <Text>{task.title}</Text>
                  </HStack>
                </ChakraLink>
              );
            })}
          </Flex>
        )}
      </Box>
    </Modal>
  );
}
export default SearchModal;

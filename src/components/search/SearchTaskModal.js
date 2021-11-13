import { useRef, useState } from "react";
import {
  Box,
  Input,
  useOutsideClick,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import SearchCard from "../UI/SearchCard";
import SearchItem from "./SearchItem";

function SearchTaskModal({ isOpen, onClose, data }) {
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

  function onItemSelected() {
    onClose();
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
          <SearchCard>
            {Object.keys(data.tasks).map((id) => {
              const task = data.tasks[id];
              if (
                searchResult &&
                task.title.toLowerCase().indexOf(searchResult.toLowerCase()) < 0
              )
                return;
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
                  <SearchItem
                    color={projectOrTag.color}
                    title={task.title}
                    onClick={onItemSelected}
                  />
                </ChakraLink>
              );
            })}
          </SearchCard>
        )}
      </Box>
    </Modal>
  );
}
export default SearchTaskModal;

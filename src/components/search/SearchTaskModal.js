import { useState } from "react";
import { Box, Input, Link as ChakraLink } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Modal from "../UI/Modal";
import SearchCard from "../UI/SearchCard";
import SearchItem from "./SearchItem";
import { FaListUl, FaHashtag } from "react-icons/fa";

function SearchTaskModal({ isOpen, onClose, data }) {
  const [isSearchShown, setSearchShown] = useState(false);
  const [searchResult, setSearchResult] = useState("");

  function onCloseHandler() {
    setSearchShown(false);
    setSearchResult("");
    onClose();
  }

  function search(e) {
    const input = e.target.value;
    setSearchResult(input);
  }

  function onItemSelected() {
    onClose();
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseHandler}
      size="xl"
      title="Search Tasks"
    >
      <Box pos="relative">
        <Input
          w="full"
          variant="unstyled"
          width="44"
          flexGrow="1"
          onChange={search}
          borderBottom="2px solid gray"
          value={searchResult}
          onFocus={() => setSearchShown(true)}
        />

        {isSearchShown && (
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
                    icon={
                      projectOrTag._.toLowerCase() === "project"
                        ? FaListUl
                        : FaHashtag
                    }
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

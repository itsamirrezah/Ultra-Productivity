//imports
import { useState, useRef } from "react";
import { Flex, Input, useOutsideClick } from "@chakra-ui/react";
//components
import Modal from "../UI/Modal";
import TagItem from "../tags/TagItem";
import SearchCard from "../UI/SearchCard";
import SearchItem from "../search/SearchItem";

function EditTagModal({ isOpen, onClose, task, onSubmit, tagIds, allTags }) {
  const [isSearchBox, setSearchBox] = useState(false);
  const [selectedTags, setSelectedTags] = useState(tagIds);
  const [searchResult, setSearchResult] = useState(null);
  const ref = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => setSearchBox(false),
  });

  function onSubmitHandler() {
    onSubmit(selectedTags);
    onClose();
  }

  function onRemoveTag(tagId) {
    if (task.projectId || selectedTags.length > 1)
      setSelectedTags((state) => state.filter((id) => id !== tagId));
  }

  function search(e) {
    const input = e.target.value;
    setSearchResult(input);
  }

  function onAddTag(tag) {
    setSearchBox(false);
    setSelectedTags((state) => [...state, tag.id]);
    setSearchResult("");
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={`Edit Tag for "${task.title}"`}
      onSubmit={onSubmitHandler}
      submitCaption="Submit"
    >
      <Flex
        pos="relative"
        flexWrap="wrap"
        p="1"
        transition="all 0.7s"
        _focusWithin={{
          borderBottom: "1px solid",
          borderBottomColor: "lightblue",
        }}
        ref={ref}
        borderBottom="2px solid gray"
      >
        {selectedTags.map((tagId) => {
          const tag = allTags[tagId];
          if (tag.type < 0) return;
          return (
            <TagItem
              key={tag.id}
              tag={tag}
              size="lg"
              isClosable={true}
              onClose={onRemoveTag.bind(null, tag.id)}
            />
          );
        })}
        <Input
          variant="unstyled"
          width="44"
          flexGrow="1"
          onChange={search}
          value={searchResult}
          onFocus={() => setSearchBox(true)}
        />
        {isSearchBox && (
          <SearchCard>
            {Object.keys(allTags).map((id) => {
              const tag = allTags[id];
              if (
                tag.type < 0 ||
                selectedTags.includes(id) ||
                (searchResult &&
                  tag.title.toLowerCase().indexOf(searchResult.toLowerCase()) <
                    0)
              )
                return;
              return (
                <SearchItem
                  key={tag.id}
                  color={tag.color}
                  title={tag.title}
                  onClick={() => onAddTag(tag)}
                />
              );
            })}
          </SearchCard>
        )}
      </Flex>
    </Modal>
  );
}

export default EditTagModal;

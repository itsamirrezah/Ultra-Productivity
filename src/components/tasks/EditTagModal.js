import { Flex, HStack, Text, Input, useOutsideClick } from "@chakra-ui/react";
import Modal from "../UI/Modal";
import TagItem from "../tags/TagItem";
import { useState } from "react";
import { useRef } from "react";

function EditTagModal({
  isOpen,
  onClose,
  taskTitle,
  onSubmit,
  tagIds,
  allTags,
}) {
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
  }

  function onRemoveTag(tagId) {
    setSelectedTags((state) => state.filter((id) => id !== tagId));
  }

  function search(e) {
    const input = e.target.value;
    setSearchResult(input);
  }

  function onAddTag(tag) {
    setSelectedTags((state) => [...state, tag.id]);
    setSearchResult("");
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={`Edit Tag for "${taskTitle}"`}
      onSubmit={onSubmitHandler}
      submitCaption="Submit"
    >
      <HStack
        pos="relative"
        flexWrap="wrap"
        alignItems="center"
        p="1"
        transition="all 0.7s"
        _focusWithin={{ borderBottom: "2px solid blue" }}
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
          <Flex
            w="full"
            flexDir="column"
            pos="absolute"
            zIndex="10"
            top="120%"
            left="0"
            bgColor="#453643"
            className="search-box"
          >
            {Object.keys(allTags).map((id) => {
              const tag = allTags[id];
              if (
                tag.type < 0 ||
                selectedTags.includes(id) ||
                (searchResult && tag.title.search(searchResult) < 0)
              )
                return;
              return (
                <Text
                  key={tag.id}
                  cursor="pointer"
                  onClick={() => onAddTag(tag)}
                >
                  {tag.title}
                </Text>
              );
            })}
          </Flex>
        )}
      </HStack>
    </Modal>
  );
}

export default EditTagModal;
//imports
import { useState } from "react";
import { Flex, Input } from "@chakra-ui/react";
import { FaHashtag } from "react-icons/fa";
//components
import Modal from "../UI/Modal";
import TagItem from "../tags/TagItem";
import SearchCard from "../UI/SearchCard";
import SearchItem from "../search/SearchItem";
import useTasks, { useDispatch } from "../../store/tasks-context";
import { addTaskTag } from "../../store/actions";

function EditTagModal({ isOpen, onClose, task }) {
  const [isSearchBox, setSearchBox] = useState(false);
  const [selectedTags, setSelectedTags] = useState(null);
  const [searchResult, setSearchResult] = useState("");
  const data = useTasks();
  const dispatch = useDispatch();

  const selected = selectedTags || task.tagIds;

  function onCloseHandler() {
    setSearchBox(false);
    setSearchResult("");
    setSelectedTags(null);
    onClose();
  }
  function onSubmitHandler() {
    dispatch(addTaskTag({ id: task.id, tagIds: selected }));
    onCloseHandler();
  }

  function onRemoveTag(tagId) {
    if (task.projectId || selected.length > 1)
      setSelectedTags(selected.filter((id) => id !== tagId));
  }

  function search(e) {
    const input = e.target.value;
    setSearchResult(input);
  }

  function onAddTag(tag) {
    setSearchBox(false);
    setSelectedTags([...selected, tag.id]);
    setSearchResult("");
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseHandler}
      size="lg"
      title={`Edit Tag for "${task.title}"`}
      onSubmit={onSubmitHandler}
      submitCaption="Submit"
    >
      <Flex
        pos="relative"
        flexWrap="wrap"
        gridGap={2}
        p="1"
        transition="all 0.7s"
        _focusWithin={{
          borderBottom: "1px solid",
          borderBottomColor: "lightblue",
        }}
        borderBottom="2px solid gray"
      >
        {selected.map((tagId) => {
          const tag = data.tags[tagId];
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
            {Object.keys(data.tags).map((id) => {
              const tag = data.tags[id];
              if (
                tag.type < 0 ||
                selected.includes(id) ||
                (searchResult &&
                  tag.title.toLowerCase().indexOf(searchResult.toLowerCase()) <
                    0)
              )
                return;
              return (
                <SearchItem
                  key={tag.id}
                  icon={FaHashtag}
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

import { TagLabel, Tag, TagCloseButton } from "@chakra-ui/react";

function TagItem({ tag, size, isClosable, onClose }) {
  const { color, title } = tag;
  return (
    <Tag
      size={size}
      alignSelf="flex-start"
      variant="subtle"
      colorScheme={color}
    >
      <TagLabel>{title}</TagLabel>
      {isClosable && <TagCloseButton onClick={onClose} />}
    </Tag>
  );
}

export default TagItem;

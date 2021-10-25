import { TagLabel, Tag } from "@chakra-ui/react";

function TagItem({ tag }) {
  const { color, title } = tag;
  return (
    <Tag size="sm" alignSelf="flex-start" variant="subtle" colorScheme={color}>
      <TagLabel>{title}</TagLabel>
    </Tag>
  );
}

export default TagItem;

import { Flex } from "@chakra-ui/react";
import TagItem from "./TagItem";

function TagItems({ items }) {
  return (
    <Flex justifyContent="flex-start">
      {items.map((tag) => (
        <TagItem key={tag.id} tag={tag} />
      ))}
    </Flex>
  );
}

export default TagItems;

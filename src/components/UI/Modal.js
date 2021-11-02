import {
  Modal as ChakraModel,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function Modal({
  isOpen,
  onClose,
  title,
  size,
  submitCaption,
  onSubmit,
  children,
}) {
  return (
    <ChakraModel isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent bgColor="#453643" px="4">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
        <ModalFooter>
          <Button onClick={onSubmit}>{submitCaption}</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModel>
  );
}
export default Modal;

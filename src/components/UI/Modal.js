import {
  Modal as ChakraModel,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function Modal({ isOpen, onClose, title, children }) {
  return (
    <ChakraModel isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="#453643" px="4">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        {children}
        <ModalFooter>
          <Button>Save</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModel>
  );
}
export default Modal;

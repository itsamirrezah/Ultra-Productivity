import { Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/react";
import Navigation from "./Navigation";
function NavDrawer({ isOpen, onClose }) {
  return (
    <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent h="100vh" maxW="56">
        <Navigation />
      </DrawerContent>
    </Drawer>
  );
}

export default NavDrawer;

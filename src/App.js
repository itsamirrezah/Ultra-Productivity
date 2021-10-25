//imports
import { HStack } from "@chakra-ui/layout";
import { Route } from "react-router-dom";
//components
import SideNav from "./components/side-nav/SideNav";
import Tasks from "./components/pages/Tasks";
function App() {
  return (
    <HStack alignItems="stretch" overflow="hidden" spacing="0">
      {/* side nav section */}
      <SideNav />
      {/* tasks  section*/}
      <Route path="/:section(projects|tags)/:id">
        <Tasks />
      </Route>
    </HStack>
  );
}

export default App;

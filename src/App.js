//imports
import { HStack } from "@chakra-ui/layout";
//components
import SideNav from "./components/side-nav/SideNav";
import Tasks from "./components/pages/Tasks";
import { Route } from "react-router";

function App() {
  return (
    <HStack alignItems="stretch">
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

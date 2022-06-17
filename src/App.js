//imports
import { HStack } from "@chakra-ui/layout";
import { Route, Redirect } from "react-router-dom";
//components
import SideNav from "./components/side-nav/SideNav";
import Tasks from "./components/pages/Tasks";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const location = useLocation();
  return (
    <HStack alignItems="stretch" overflow="hidden" spacing="0">
      <SideNav />
      <Route exact path="/">
        <Redirect to="/tags/today" />
      </Route>
      <Route path="/:section(projects|tags)/:id" key={location.pathname}>
        <Tasks />
      </Route>
    </HStack>
  );
}

export default App;

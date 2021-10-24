import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  components: {
    Button: { baseStyle: { _focus: { boxShadow: "none" } } },
    Link: { baseStyle: { _focus: { boxShadow: "none" } } },
  },
});

export default theme;

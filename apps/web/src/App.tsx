import { SessionContextProvider } from "./contexts/SessionContext";
import { useSession } from "./hooks/useSession";

import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/global.theme";
import { ToastContainer } from "react-toastify";
import Router from "./Router";

const App = () => {
  const {} = useSession();

  return (
    <ThemeProvider theme={theme}>
      <SessionContextProvider>
        <ToastContainer />
        <Router />
      </SessionContextProvider>
    </ThemeProvider>
  );
};

export default App;

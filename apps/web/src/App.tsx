import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "./contexts/SessionContext";
import { useSession } from "./hooks/useSession";
import Navbar from "./components/Navbar";

//Fontes Material Ui
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App = () => {
  const {} = useSession();

  return (
    <SessionContextProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </SessionContextProvider>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSession } from "./hooks/useSession";

import Home from "./pages/Home";
import Login from "./pages/Login/index";

import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Donates from "./pages/donates";
import Admin from "./pages/Admin";

const Router = () => {
  const { isLogged } = useSession();

  if (isLogged === undefined) return null;

  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="donates" element={<Donates />} />
         
          <Route path="admin" element={<Admin />} />
          <Route index element={<Home />} />
        
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;

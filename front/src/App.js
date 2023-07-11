import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
import Accueil from "./components/origine/origine"; 
import PageNotFound from "./components/404/page404";
// import Individu from "./components/individu/individu"; 

export default function App() {
  return (
    <>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <BrowserRouter>
        <Routes>
          <Route index element={<Accueil />} />

          <Route path="/*" element={<PageNotFound />} />

          {/* Un nouveau Page  */}
          {/* <Route
            path="individu/"
            element={<Authentification Cmp={Individu} />}
          /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

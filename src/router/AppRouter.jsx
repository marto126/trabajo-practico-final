import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/Home";
import { IngresarProductos } from "../pages/IngresarProductos";
import { Login } from '../pages/Login';
import { NotFound } from "../pages/NotFound";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Registro } from "../pages/Registro";


const AppRouter = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/ingresar-productos"
            element={user ? <IngresarProductos /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
     
    </BrowserRouter>
  );
};

export { AppRouter };
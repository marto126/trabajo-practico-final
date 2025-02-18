import React, { useState, useEffect } from "react";
import { signInWithGoogle, logout } from "../config/auht";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {Layout} from "../components/Layout";

const Login = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  return (
    <Layout>
      <div className="container is-flex is-justify-content-center is-align-items-center" style={{ height: "100vh" }}>
        <div className="box has-text-centered p-5" style={{ maxWidth: "400px" }}>
          {user ? (
            <>
              <img src={user.photoURL} alt="Foto de perfil" className="image is-128x128 is-rounded mx-auto" />
              <h1 className="title is-4">Bienvenido, {user.displayName}!</h1>
              <button className="button is-danger is-fullwidth mt-3" onClick={handleLogout}>
                <span className="icon">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span>Cerrar sesión</span>
              </button>
            </>
          ) : (
            <>
              <h1 className="title is-3">Iniciar Sesión</h1>
              <p className="subtitle is-6 mb-4">Accede con tu cuenta de Google</p>
              <button className="button is-primary is-fullwidth" onClick={handleLogin}>
                <span className="icon">
                  <i className="fab fa-google"></i>
                </span>
                <span>Iniciar sesión con Google</span>
              </button>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export {Login};

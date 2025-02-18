import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import { Layout } from "../components/Layout";

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contraseña: "",
  });

  const [mensaje, setMensaje] = useState(""); // Estado para mostrar el mensaje de éxito

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = await hashPassword(formData.contraseña);
    console.log("Datos del formulario:", { ...formData, contraseña: hashedPassword });

    // Limpiar formulario después del registro
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      contraseña: "",
    });

    // Mostrar mensaje de éxito
    setMensaje("¡Registro exitoso!");

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setMensaje("");
    }, 1500);
  };

  return (
    <Layout>
      <div className="container is-flex is-justify-content-center is-align-items-center" style={{ height: "100vh" }}>
        <div className="box" style={{ maxWidth: "400px", width: "100%" }}>
          <h1 className="title has-text-centered">Registro</h1>

          {/* Mensaje de éxito */}
          {mensaje && <div className="notification is-success has-text-centered">{mensaje}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input className="input" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label">Apellido</label>
              <div className="control">
                <input className="input" type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <label className="label">Contraseña</label>
              <div className="control">
                <input className="input" type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} required />
              </div>
            </div>

            <div className="field">
              <button className="button is-primary is-fullwidth">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export { Registro };

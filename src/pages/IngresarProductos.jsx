import React, { useEffect, useState } from "react";
import { db } from "../config/firebase.js";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import {Layout} from "../components/Layout";
import "bulma/css/bulma.min.css";

const IngresarProductos = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", longDescription: "", price: "", sku: "" });
  const [editingId, setEditingId] = useState(null);
  const [isModalActive, setIsModalActive] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDoc(doc(db, "products", editingId), form);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "products"), form);
    }
    setForm({ name: "", description: "", longDescription: "", price: "", sku: "" });
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    await deleteDoc(doc(db, "products", id));
  };

  return (
    <Layout>
      <div className="container">
        <h2 className="title has-text-centered">Administrar Productos</h2>
        <form onSubmit={handleSubmit} className="box">
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input className="input" type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <label className="label">Descripción</label>
            <div className="control">
              <input className="input" type="text" name="description" value={form.description} onChange={handleChange} required />
            </div>
          </div>
          <div className="field">
            <label className="label">Descripción larga</label>
            <div className="control">
              <textarea className="textarea" name="longDescription" value={form.longDescription} onChange={handleChange} required></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label">Precio</label>
            <div className="control">
              <input
                className="input"
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              SKU
              <span
                className="icon has-text-info ml-2"
                style={{ cursor: "pointer" }}
                onClick={() => setIsModalActive(true)}
              >
                <i className="fas fa-question-circle"></i>
              </span>
            </label>
            <div className="control">
              <input className="input" type="text" name="sku" value={form.sku} onChange={handleChange} required />
            </div>
          </div>
          <div className="control">
            <button className="button is-primary" type="submit">
              {editingId ? "Actualizar" : "Agregar"}
            </button>
           {editingId && ( 
            <button className="button is-primary ml-3" type="boton">
              Limpiar
            </button>
            )
           }
          </div>
        </form>

        {products.length === 0 && (
          <div className="notification is-warning">No hay productos disponibles.</div>
        )}

        {products.length > 0 && (
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>SKU</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.sku}</td>
                  <td>
                    <button className="button is-warning is-small" onClick={() => handleEdit(product)}>Editar</button>
                    <button className="button is-danger is-small ml-2" onClick={() => handleDelete(product.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className={`modal ${isModalActive ? "is-active" : ""}`}>
          <div className="modal-background" onClick={() => setIsModalActive(false)}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Ejemplos de SKU</p>
              
            </header>
            <section className="modal-card-body">
              <p><strong>Ejemplos de SKU según la categoría:</strong></p>
              <ul>
                <li>👕 <strong>CAM-TES-BLK-M</strong> → Camiseta Tesla Negra, Talla M</li>
                <li>👖 <strong>PAN-LEVI-501-32</strong> → Pantalón Levi's 501, Talla 32</li>
                <li>👟 <strong>ZAP-NIKE-AIRRED-42</strong> → Zapatillas Nike Air Rojas, Talla 42</li>
                <li>📱 <strong>CEL-APL-IP14-256-BLK</strong> → iPhone 14, 256GB, Negro</li>
                <li>🖥 <strong>LAP-DELL-XPS13-16GB</strong> → Laptop Dell XPS 13, 16GB RAM</li>
              </ul>
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success" onClick={() => setIsModalActive(false)}>Entendido</button>
            </footer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { IngresarProductos };
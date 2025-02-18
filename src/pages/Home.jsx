import React, { useEffect, useState } from "react";
import { db } from "../config/firebase.js"; 
import { collection, onSnapshot } from "firebase/firestore";
import { Layout } from "../components/Layout.jsx";
import { ProductDetail } from "../components/ProductDetail";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const fetchedProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Productos obtenidos:", fetchedProducts);
      setProducts(fetchedProducts);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <section className="hero is-info">
        <div className="hero-body has-text-centered">
          <h1 className="title">Bienvenido a nuestra tienda</h1>
          <p className="subtitle">Encuentra los mejores productos al mejor precio</p>
        </div>
      </section>

      <div className="section">
        <div className="container">
          <h2 className="title is-3 has-text-dark has-text-centered">Nuestros Productos</h2>
          
          {products.length === 0 ? (
            <div className="notification is-warning has-text-centered">
              <p className="title is-5">Todavía no tenemos productos</p>
              <p className="subtitle is-7">¿Qué esperas para ser el primero? Inicia sesión y agrega el primer producto.</p>
            </div>
          ) : (
            <div className="columns is-multiline">
              {products.map((product) => (
                <div key={product.id} className="column is-3">
                  <div 
                    className="card has-background-light has-shadow"
                    style={{ cursor: "pointer", border: "1px solid #ddd", transition: "0.3s" }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
                  >
                    <div className="card-content has-background-grey-dark">
                      <p className="title is-5 has-text-light">Nombre: {product.name}</p>
                      <p className="subtitle is-6 has-text-grey-light">Descripción: {product.description}</p>
                      <p className="has-text-weight-bold has-text-primary">$ {product.price}</p>
                      <p className="has-text-grey-light">SKU: {product.sku}</p>
                    </div>
                    <footer className="card-footer">
                      <button 
                        className="button is-info is-fullwidth card-footer-item"
                        onClick={() => setSelectedProduct(product)}
                      >
                        Leer más detalles
                      </button>
                    </footer>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popup de detalles del producto */}
      {selectedProduct && (
        <ProductDetail 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)}
          isLightTheme={true} 
        />
      )}
    </Layout>
  );
};

export { Home };

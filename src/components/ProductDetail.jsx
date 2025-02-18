import React from "react";

const ProductDetail = ({ product, onClose, isLightTheme }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card" style={{ backgroundColor: isLightTheme ? "#fff" : "#222", color: isLightTheme ? "#333" : "#fff" }}>
        <header className="modal-card-head has-background-primary">
          <p className="modal-card-title has-text-dark">{product.name}</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body has-background-grey-dark">
          <p className="has-text-primary-light">{product.description}</p>
          <p className="has-text-weight-bold has-text-primary">$ {product.price}</p>
          <p className="has-text-grey-light">SKU: {product.sku}</p>
          <p  className="has-text-grey-light">Descripción larga:{product.longDescription}</p>
        </section>
        <footer className="modal-card-foot has-background-primary">
          <button className="button is-danger" onClick={onClose}>Cerrar</button>
        </footer>
      </div>
    </div>
  );
};

export { ProductDetail };

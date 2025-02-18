import "bulma/css/bulma.min.css";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="hero is-primary">
        <div className="hero-body">
          <h1 className="title">E-COMER</h1>
        </div>
      </header>
      
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/">Home</Link>
            <Link className="navbar-item" to="/ingresar-productos">Ingresar Productos</Link>
            <Link className="navbar-item" to="/login">Login</Link> 
            <Link className="navbar-item" to="/registro">registrarse</Link> 
          </div>
        </div>
      </nav>
      
      <main className="section" style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
        {children}
      </main>
      
      <footer className="footer has-text-centered has-background-primary has-text-white">
        <p>&copy; {new Date().getFullYear()} aplicacion de martin</p>
      </footer>
    </div>
  );
};

export {Layout};

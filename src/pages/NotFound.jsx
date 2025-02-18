import {Layout} from "../components/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout>
      <div className="container has-text-centered">
        <h1 className="title is-1 has-text-danger">404</h1>
        <p className="subtitle is-4">Página no encontrada</p>
        <p className="mb-4">Lo sentimos, la página que buscas no existe.</p>
        <Link to="/" className="button is-primary is-medium">
          Volver al inicio
        </Link>
      </div>
    </Layout>
  );
};

export {NotFound};
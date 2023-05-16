// import logo from './logo.svg';
import './App.css';
import ContenedorBtnSalir from './elementos/BtnSalir';
// import btnSalir from './elementos/BtnSalir';
import MenuNavegacion from './componentes/MenuNavegacion';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import FormularioGasto from './componentes/FormularioGasto';
import BarraTotalGastado from './componentes/BarraTotalGastado';

const App = () => {
  return (
    <div>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
      <ContenedorBtnSalir>
        <btnSalir><NavLink to="/inicio-sesion"></NavLink></btnSalir>
      </ContenedorBtnSalir>
      <MenuNavegacion />
      <div className='contenedor-app'>
        <div className="contenedor-app__head">
          <FormularioGasto />
        </div>
      </div>
      <BarraTotalGastado />
    </div>
  );
}

export default App;

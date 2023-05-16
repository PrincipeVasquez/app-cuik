import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditarGasto from './componentes/EditarGasto';
import GastosPorCategoria from './componentes/GastosPorCategoria';
import InicioSesion from './componentes/InicioSesion';
import ListaDeGastos from './componentes/ListaDeGastos';
import RegistroUsuarios from './componentes/RegistroUsuarios';
import {Helmet} from "react-helmet";
import favicon from './imagenes/logo.png';
// import Footer from './componentes/Footer';
import { AuthProvider } from './Contextos/AuthContext';
import RutaPrivada from './componentes/RutaPrivada';
import { TotalGastadoProvider } from './Contextos/TotalGastadoEnElMesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      <title>Cuik</title>
    </Helmet>
    <AuthProvider>
      <TotalGastadoProvider>
        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path="/inicio-sesion" element={<InicioSesion />}/>
              <Route path="/crear-cuenta" element={<RegistroUsuarios />}/>

              <Route path="/lista" element={
                <RutaPrivada>
                  <ListaDeGastos />
                </RutaPrivada>
              }
              />

              <Route path="/categorias" element={
                <RutaPrivada>
                  <GastosPorCategoria />
                </RutaPrivada>
              }
              />

              <Route path="/editar/:id" element={
                <RutaPrivada>
                  <EditarGasto />
                </RutaPrivada>
              }
              />

              <Route path="/" element={
                <RutaPrivada>
                  <App />
                </RutaPrivada>
              }
              />

              {/* <Route path="/categorias" element={<GastosPorCategoria />}/>
              <Route path="/lista" element={<ListaDeGastos />}/>
              <Route path="/editar/:id" element={<EditarGasto />}/>
              <Route path="/" element={<App />}/> */}
            </Routes>
            {/* <Footer /> */}
          </Contenedor>
        </BrowserRouter>
      </TotalGastadoProvider>
    </AuthProvider>
  </>
);
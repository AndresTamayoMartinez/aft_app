import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/component/NavigationBar';
import LoginView from './components/views/Login_View';
import Cookies from 'universal-cookie';
import ProductsView from './components/views/Products_View';

const App = () => {

  const route = 'http://localhost:3000';
  const cookies = new Cookies();

  if(cookies.get('token') == '' || cookies.get('token') == null){
    return(
      <LoginView route={route} />
    );
  } else{
    return(
      <div>
        <NavigationBar />
        <Routes>
          <Route path={'/'} element={<h1>Hola Mundo</h1>} />
          <Route path={'/index.html'} element={<h1>Hola Mundo</h1>} />
          <Route path={'/inicio'} element={<h1>Hola Mundo</h1>} />
          <Route path={'/productos'} element={<ProductsView route={route} />} />
          <Route path={'/clientes'} element={<h1>Clientes</h1>} />
          <Route path={'/empleados'} element={<h1>Empleados</h1>} />
          <Route path={'/proveedores'} element={<h1>Proveedores</h1>} />
          <Route path={'/ventas'} element={<h1>Ventas</h1>} />
          <Route path={'/ingresos'} element={<h1>Ingresos</h1>} />
          <Route path={'/reportes'} element={<h1>Reportes</h1>} />
        </Routes>
      </div>
    );
  }
  
}

export default App;

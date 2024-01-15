import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/component/NavigationBar';
import Login from './components/views/Login';
import Cookies from 'universal-cookie';

const App = () => {

  const route = 'http://localhost:3000';
  const cookies = new Cookies();

  if(cookies.get('token') == '' || cookies.get('token') == null){
    return(
      <Login route={route} />
    );
  } else{
    return(
      <div>
        <NavigationBar />
        <Routes>
          <Route path={'/'} element={<h1>Hola Mundo</h1>} />
          <Route path={'/index.html'} element={<h1>Hola Mundo</h1>} />
          <Route path={'/inicio'} element={<h1>Hola Mundo</h1>} />
          <Route path={'/productos'} element={<h1>Productos</h1>} />
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

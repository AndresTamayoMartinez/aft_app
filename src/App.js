import './App.css';
import Cookies from 'universal-cookie';
import { Routes, Route } from 'react-router-dom';
import LoginView from './components/views/Login_View';
import ClientsView from './components/views/Clients_View';
import ProductsView from './components/views/Products_View';
import NavigationBar from './components/component/NavigationBar';
import EmployeesView from './components/views/Employee_View';
import ProvidersView from './components/views/Providers_View';
import SalesView from './components/views/Sales_View';
import SalesDetailView from './components/views/Sales_Detail_View';

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
          <Route path={'/clientes'} element={<ClientsView route={route} />} />
          <Route path={'/empleados'} element={<EmployeesView route={route} />} />
          <Route path={'/proveedores'} element={<ProvidersView route={route} />} />
          <Route path={'/ventas'} element={<SalesView route={route} />} />
          <Route path={'/ingresos'} element={<h1>Ingresos</h1>} />
          <Route path={'/reportes'} element={<h1>Reportes</h1>} />
          <Route path={'/detalle_venta'} element={<SalesDetailView route={route} />} />
        </Routes>
      </div>
    );
  }
  
}

export default App;

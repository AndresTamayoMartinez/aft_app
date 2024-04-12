import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import '../css/NavigationBar.css';

const NavigationBar = () => {
    const cookies = new Cookies();

    const handdleClick = () => {
        cookies.remove('id', {path: "/"});
        cookies.remove('name', {path: "/"});
        cookies.remove('token', {path: "/"});
        window.location.href = window.location.href;
    };

    return(
        <nav className="navbar">
            <div className='max-width'>
                <div className="logo"><Link to={'/inicio'}>Acabados Finos Tamayo III</Link></div>
                <ul className='menu'>
                    <li><Link to={'/productos'}>Productos</Link></li>
                    <li><Link to={'/clientes'}>Clientes</Link></li>
                    <li><Link to={'/empleados'}>Empleados</Link></li>
                    <li><Link to={'/proveedores'}>Proveedores</Link></li>
                    <li><Link to={'/ventas'}>Ventas</Link></li>
                    <li><Link to={'/ingresos'}>Ingresos</Link></li>
                    <li><Link to={'/detalle_venta'}>Reportes</Link></li>
                    <li onClick={handdleClick}><a>Cerrar Sesion</a></li>
                </ul>
                <div className="menu-btn">
                    <i className="fas fa-bars"></i>
                </div>
            </div>
        </nav>
    );
};

export default NavigationBar;
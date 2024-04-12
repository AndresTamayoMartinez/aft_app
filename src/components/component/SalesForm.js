import '../css/SalesForm.css'
import Modal from './Modal';
import Cookies from 'universal-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesForm = ({ route, sale, setSale, edit, setEdit }) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [ modalClient, setModalClient ] = useState(false);
    const [ modalEmployee, setModalEmployee ] = useState(false);

    const handleChange = e => {
        setSale({
            ...sale,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        if(sale.date === '' || sale.paid === '' || sale.delivered === '' || sale.id_client === '' || sale.id_employee === ''){
            alert("Todos los campos son obligatorios");
            e.preventDefault();
            return;
        }
        if(edit.id === 0 && edit.saleType === 'new'){
            e.preventDefault();
            const requestInit = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(sale),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/sale?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => cookies.set('idSale', data.id, {path: "/"}))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    alert('Error al : ', error);
            });

            setSale({
                date: '',
                paid: '',
                delivered: '',
                id_client: '',
                id_employee: '',
                subtotal: 0,
                abono: 0,
                total: 0
            });

            setTimeout(() => {
                navigate('/detalle_venta');
            }, 2000);
        } else{
            e.preventDefault();
            const requestInit = {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(sale),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/sale/${edit.id}?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    console.log('Error al : ', error)
            });

            setSale({
                date: '',
                paid: '',
                delivered: '',
                id_client: '',
                id_employee: '',
                subtotal: 0,
                abono: 0,
                total: 0
            });

            setTimeout(() => {
                navigate('/detalle_venta');
            }, 500);
        }
    };

    return(
        <div className='form-responsive'>
            <h1>Registrar Venta</h1>
            <form onSubmit={handleSubmit}>
                <label>Fecha</label>
                <input type="datetime-local" name='date' className='inpLogin' onChange={handleChange} value={sale.date}/>
                <div className='pd-container'>
                    <div>
                        <label>Pagado</label>
                        <select name='paid' className='inpLogin' onChange={handleChange} value={sale.paid}>
                            <option value={"POR COBRAR"}>POR COBRAR</option>
                            <option value={"PAGADO"}>PAGADO</option>
                        </select>
                    </div>
                    <div>
                        <label>Entregado</label>
                        <select name='delivered' className='inpLogin' onChange={handleChange} value={sale.delivered}>
                            <option value={"POR ENTREGAR"}>POR ENTREGAR</option>
                            <option value={"ENTREGADO"}>ENTREGADO</option>
                        </select>
                    </div>
                </div>
                <label>Cliente</label>
                <div className='div_select'>
                    <input type="text" name='id_client' className='inpSelect' onChange={handleChange}  value={sale.id_client} />
                    <label onClick={() => {setModalClient(true)}}>Seleccionar Cliente</label>
                </div>
                <label>Empleado</label>
                <div className='div_select'>
                    <input type="text" name='id_employee' className='inpSelect' onChange={handleChange}  value={sale.id_employee} />
                    <label onClick={() => {setModalEmployee(true)}}>Seleccionar Empleado</label>
                </div>
                <label>subtotal</label>
                <input type="text" name='subtotal' className='inpLogin' onChange={handleChange}  value={sale.subtotal} readOnly />
                <label>abono</label>
                <input type="text" name='abono' className='inpLogin' onChange={handleChange}  value={sale.abono} readOnly />
                <label>total</label>
                <input type="text" name='total' className='inpLogin' onChange={handleChange}  value={sale.total} readOnly />
                <input type='submit' name='sale_btn' value='Registrar'></input>
            </form>
            <Modal
                modalClient={modalClient}
                modalEmployee={modalEmployee}
                setModalClient={setModalClient}
                setModalEmployee={setModalEmployee}
                setSale={setSale}
                sale={sale}
                route={route}
            />
        </div>
    );
};

export default SalesForm;
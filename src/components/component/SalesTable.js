import '../css/SalesTable.css'
import Cookies from 'universal-cookie';
import { useState } from 'react';

const SalesTable = ({ route, sales, setSale, setEdit }) => {

    const cookies = new Cookies();
    const [ search, setSearch ] = useState("")
    const [ option, setOption ] = useState("");

    const handleDelete = e => {
        const requestInit = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*' ,
              'Content-type': 'application/json'
            }
        };

        fetch(`${route}/api/sale/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(() => {
            alert('Se ha eliminado la venta');
            window.location.href = window.location.href;
        })
        .catch(error => {
            console.log('Error eliminando la venta: ' + error)
        });
    };

    const handleUpdate = e => {
        const requestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*' ,
              'Content-type': 'application/json'
            }
        };

        fetch(`${route}/api/sale/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => {
            setEdit({
                id: e.target.id,
                edit: true
            })
            setSale({
                date: data.data[0].fecha,
                paid: data.data[0].pagado,
                delivered: data.data[0].entregado,
                id_client: data.data[0].id_cliente,
                id_employee: data.data[0].id_empleado,
                subtotal: data.data[0].subtotal,
                abono: data.data[0].abono,
                total: data.data[0].total
            });
        })
        .catch(error => {
            console.log('Error editando la venta: ' + error)
        });
    };
    const handleSearch = e => {
        setSearch(e.target.value)
    };
    const handleOption = e => {
        setOption(e.target.value);
    }
    let salesResult = [];
    if(!search){
        salesResult = []
    } else{
        if(option == "name"){
            salesResult = sales.filter((saleSearch) =>
                saleSearch.nombre_cliente.toLowerCase().includes(search.toLocaleLowerCase())
            )
        } else{
            salesResult = sales.filter((saleSearch) =>
                saleSearch.id.toString().includes(search)
            )
        }
    }

    return(
        <div className='table-responsive'>
            <h1>Buscar Venta</h1>
            <input type='text' name='searchSale' value={search} placeholder='Buscar Venta' onChange={handleSearch}></input>
            <select name="salesSearch" onChange={handleOption}>
                <option value="id">ID</option>
                <option value="name">Nombre</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>FECHA</th>
                        <th>CLIENTE</th>
                        <th>EMPLEADO</th>
                        <th>PAGADO</th>
                        <th>ENTREGADO</th>
                        <th>SUBTOTAL</th>
                        <th>ABONO</th>
                        <th>TOTAL</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {salesResult.map(sale => (
                        <tr key={sale.id}>
                            <td name={sale.id}>{sale.id}</td>
                            <td name={sale.fecha}>{sale.fecha}</td>
                            <td name={sale.nombre_cliente}>{sale.nombre_cliente}</td>
                            <td name={sale.nombre_empleado}>{sale.nombre_empleado}</td>
                            <td name={sale.pagado}>{sale.pagado}</td>
                            <td name={sale.entregado}>{sale.entregado}</td>
                            <td name={sale.subtotal}>{sale.subtotal}</td>
                            <td name={sale.abono}>{sale.abono}</td>
                            <td name={sale.total}>{sale.total}</td>
                            <td><button id={sale.id} onClick={handleUpdate}>EDITAR</button></td>
                            <td><button id={sale.id} onClick={handleDelete}>ELIMINAR</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesTable;
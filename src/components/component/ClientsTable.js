import '../css/ClientsTable.css'
import Cookies from 'universal-cookie';
import { useState } from 'react';

const ClientsTable = ({ route, clients, setClient, setEdit }) => {

    const cookies = new Cookies();
    const [ search, setSearch ] = useState("")

    const handleDelete = e => {
        const requestInit = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*' ,
              'Content-type': 'application/json'
            }
        };

        fetch(`${route}/api/client/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(() => {
            alert('Se ha eliminado el cliente');
            window.location.href = window.location.href;
        })
        .catch(error => {
            console.log('Error eliminando el cliente: ' + error)
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

        fetch(`${route}/api/client/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => {
            setEdit({
                id: e.target.id,
                edit: true
            })
            setClient({
                name: data.data[0].nombre,
                street: data.data[0].calle,
                colony: data.data[0].colonia,
                city: data.data[0].ciudad,
                phone: data.data[0].telefono
            });
        })
        .catch(error => {
            console.log('Error editando el producto: ' + error)
        });
    };

    const handleSearch = e => {
        setSearch(e.target.value)
    };

    let clientsResult = [];
    if(!search){
        clientsResult = []
    } else{
        clientsResult = clients.filter((clientSearch) =>
            clientSearch.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    return(
        <div className='table-responsive'>
            <h1>Buscar Clientes</h1>
            <input type='text' name='searchClient' value={search} placeholder='Buscar Cliente' onChange={handleSearch}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>CALLE</th>
                        <th>COLONIA</th>
                        <th>CIUDAD</th>
                        <th>TELEFONO</th>
                        <th>EDITAR</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {clientsResult.map(client => (
                        <tr key={client.id}>
                            <td name={client.id}>{client.id}</td>
                            <td name={client.nombre}>{client.nombre}</td>
                            <td name={client.calle}>{client.calle}</td>
                            <td name={client.colonia}>{client.colonia}</td>
                            <td name={client.ciudad}>{client.ciudad}</td>
                            <td name={client.telefono}>{client.telefono}</td>
                            <td><button id={client.id} onClick={handleUpdate}>EDITAR</button></td>
                            <td><button id={client.id} onClick={handleDelete}>ELIMINAR</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientsTable;
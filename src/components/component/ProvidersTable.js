import '../css/ProvidersTable.css'
import Cookies from 'universal-cookie';
import { useState } from 'react';

const ProvidersTable = ({ route, providers, setProvider, setEdit }) => {

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

        fetch(`${route}/api/provider/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(() => {
            alert('Se ha eliminado el proveedor');
            window.location.href = window.location.href;
        })
        .catch(error => {
            console.log('Error eliminando el proveedor: ' + error)
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

        fetch(`${route}/api/provider/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => {
            setEdit({
                id: e.target.id,
                edit: true
            })
            setProvider({
                business: data.data[0].razon_social,
                name: data.data[0].nombre,
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

    let providersResult = [];
    if(!search){
        providersResult = []
    } else{
        providersResult = providers.filter((providerSearch) =>
            providerSearch.razon_social.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    return(
        <div className='table-responsive'>
            <h1>Buscar Proveedores</h1>
            <input type='text' name='searchProvider' value={search} placeholder='Buscar Proveedor' onChange={handleSearch}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>RAZON SOCIAL</th>
                        <th>NOMBRE</th>
                        <th>TELEFONO</th>
                        <th>EDITAR</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {providersResult.map(provider => (
                        <tr key={provider.id}>
                            <td name={provider.id}>{provider.id}</td>
                            <td name={provider.razon_social}>{provider.razon_social}</td>
                            <td name={provider.nombre}>{provider.nombre}</td>
                            <td name={provider.telefono}>{provider.telefono}</td>
                            <td><button id={provider.id} onClick={handleUpdate}>EDITAR</button></td>
                            <td><button id={provider.id} onClick={handleDelete}>ELIMINAR</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProvidersTable;
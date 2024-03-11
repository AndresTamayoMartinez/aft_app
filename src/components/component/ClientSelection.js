import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';

const ClientSelection = ({ route, setSale, sale, setModalClient }) => {
    const cookies = new Cookies();
    const [ clients, setClients ] = useState([]);
    const [ search, setSearch ] = useState();
    
    useEffect(() => {
        const requestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*' ,
              'Content-type': 'application/json'
            }
        };

        fetch(`${route}/api/client?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setClients(data.data))
        .catch(error => {
            console.log('Error providing clients in client view: ' + error)
        })
    });

    const handleSearch = e => {
        setSearch(e.target.value);
    }

    let clientsResult = [];
    if(!search){
        clientsResult = [];
    } else{
        clientsResult = clients.filter((clientSearch) =>
            clientSearch.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    const handleClick = e => {
        setSale({
            ...sale,
            [e.target.name]: e.target.value
        });
        setModalClient(false);
    }

    return(
        <div className='table-responsive'>
            <input type='text' name='searchClient' value={search} placeholder='Buscar Cliente' onChange={handleSearch}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>CALLE</th>
                        <th>COLONIA</th>
                        <th>SELECCIONAR</th>
                    </tr>
                </thead>
                <tbody>
                    {clientsResult.map(client => (
                        <tr key={client.id}>
                            <td name={client.id}>{client.id}</td>
                            <td name={client.nombre}>{client.nombre}</td>
                            <td name={client.calle}>{client.calle}</td>
                            <td name={client.colonia}>{client.colonia}</td>
                            <td><button id={client.id} name='id_client' value={client.id} onClick={handleClick}>SELECCIONAR</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ClientSelection;
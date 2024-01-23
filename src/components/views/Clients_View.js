import '../css/ClientsView.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import ClientsTable from '../component/ClientsTable';
import ClientsForm from '../component/ClientsForm';

const ClientsView = ({ route }) => {

    const cookies = new Cookies();
    const [ clients, setClients ] = useState([]);
    const [ edit, setEdit] = useState({
        id: 0,
        edit: false
    })
    const [ client, setClient ] = useState({
        name: '',
        street: '',
        colony: '',
        city: '',
        phone: ''
    });

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

    return(
        <div className='max-width clients-content'>
            <div className='table-container'>
                <ClientsTable route={route} clients={clients} setClient={setClient} edit={edit} setEdit={setEdit} setClients={setClients} />
            </div>
            <div className='client-form'>
                <ClientsForm route={route} client={client} setClient={setClient} edit={edit} setEdit={setEdit} />
            </div>
        </div>
    );
}

export default ClientsView;
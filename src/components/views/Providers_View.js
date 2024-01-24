import '../css/ProvidersView.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import ProvidersTable from '../component/ProvidersTable';
import ProvidersForm from '../component/ProvidersForm';

const ProvidersView = ({ route }) => {

    const cookies = new Cookies();
    const [ providers, setProviders ] = useState([]);
    const [ edit, setEdit] = useState({
        id: 0,
        edit: false
    })
    const [ provider, setProvider ] = useState({
        business: '',
        name: '',
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

        fetch(`${route}/api/provider?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setProviders(data.data))
        .catch(error => {
            console.log('Error providing providers in provider view: ' + error)
        })
    });

    return(
        <div className='max-width providers-content'>
            <div className='table-container'>
                <ProvidersTable route={route} providers={providers} setProvider={setProvider} edit={edit} setEdit={setEdit} setProviders={setProviders} />
            </div>
            <div className='provider-form'>
                <ProvidersForm route={route} provider={provider} setProvider={setProvider} edit={edit} setEdit={setEdit} />
            </div>
        </div>
    );
}

export default ProvidersView;
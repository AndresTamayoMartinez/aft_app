import '../css/SalesView.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import SalesTable from '../component/SalesTable';
import SalesForm from '../component/SalesForm';
// import SalesDetTable from '../component/SalesDetTable';
// import SalesDetForm from '../component/SalesTable';

const SalesView = ({ route }) => {

    const cookies = new Cookies();
    const [ sales, setSales ] = useState([]);
    const [ edit, setEdit] = useState({
        id: 0,
        saleType: 'new'
    });
    const [ sale, setSale ] = useState({
        date: '',
        paid: 'POR COBRAR',
        delivered: 'POR ENTREGAR',
        id_client: '',
        id_employee: '',
        subtotal: 0,
        abono: 0,
        total: 0
    });
    const [ product, setProduct ] = useState({
        id_sale: 0,
        id_product: 0,
        id_presentation: 0,
        amount: 0,
        price: 0,
        subtotal: 0
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

        fetch(`${route}/api/sale?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setSales(data.data))
        .catch(error => {
            console.log('Error providing sales in sale view: ' + error)
        })
    });

    return(
        <div>
            <div className='max-width sales-content'>
                <div className='table-container'>
                    <SalesTable route={route} sales={sales} setSale={setSale} edit={edit} setEdit={setEdit} setSales={setSales} />
                </div>
                <div className='sale-form'>
                    <SalesForm route={route} sale={sale} setSale={setSale} edit={edit} setEdit={setEdit} />
                </div>
            </div>
            {/* <div className='max-width sales-content'>
                <div className='table-container'>
                    <SalesDetTable route={route} sales={sales} setSale={setSale} edit={edit} setEdit={setEdit} setSales={setSales} />
                </div>
                <div className='sale-form'>
                    <SalesDetForm route={route} sale={sale} setSale={setSale} edit={edit} setEdit={setEdit} />
                </div>
            </div> */}
        </div>
    );
}

export default SalesView;
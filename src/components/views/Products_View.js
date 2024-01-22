import '../css/ProductsView.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import ProductsTable from "../component/ProductsTable";
import ProductsForm from '../component/ProductsForm';

const ProductsView = ({ route }) => {

    const cookies = new Cookies();
    const [ products, setProducts ] = useState([]);
    const [ edit, setEdit] = useState({
        id: 0,
        edit: false
    })
    const [ product, setProduct ] = useState({
        name: '',
        description: '',
        price: 0,
        volume: 0,
        stock: 0,
        id_category: 0,
        id_brand: 0
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

        fetch(`${route}/api/product?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setProducts(data.data))
        .catch(error => {
            console.log('Error providing products in product view: ' + error)
        })
    });

    return(
        <div className='max-width products-content'>
            <div className='table-container'>
                <ProductsTable route={route} products={products} setProduct={setProduct} edit={edit} setEdit={setEdit} setProducts={setProducts} />
            </div>
            <div className='product-form'>
                <ProductsForm route={route} product={product} setProduct={setProduct} edit={edit} setEdit={setEdit} />
            </div>
        </div>
    );
}

export default ProductsView;
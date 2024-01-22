import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';

const BrandSelect = ({ route, handleChange, value }) => {
    const cookies = new Cookies();
    const [ brands, setBrands ] = useState([]);
    
    useEffect(() => {
        const requestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*' ,
                'Content-type': 'application/json'
            }
        };

        fetch(`${route}/api/brand?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setBrands(data.data))
        .catch(error => {
            console.log('Error providing brands in product view: ' + error)
        });
    });
    
    return(
        <select name="id_brand" onChange={handleChange} value={value}>
            <option value={0}>Seleccionar marca</option>
            {brands.map(brand => (
                <option key={brand.id} value={brand.id} >{brand.nombre}</option>
            ))}
        </select>
    );
};

export default BrandSelect;
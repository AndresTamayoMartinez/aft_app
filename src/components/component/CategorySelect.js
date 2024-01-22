import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';

const CategorySelect = ({ route, setPresentations, handleChange, value }) => {
    const cookies = new Cookies();
    const [ categories, setCategories ] = useState([]);
    
    useEffect(() => {
        const requestInit = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*' ,
                'Content-type': 'application/json'
            }
        };

        fetch(`${route}/api/category?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setCategories(data.data))
        .catch(error => {
            console.log('Error providing categories in product view: ' + error)
        });
    });

    // const handleChange = e => {
    //     fetch(`${route}/api/presentation/${e.target.value}?accesstoken=${cookies.get('token')}`)
    //     .then(res => res.json())
    //     .then(data => setPresentations(data.data))
    //     .catch(error => {
    //         console.log('Error providing categories in product view: ' + error)
    //     });
    // };

    return(
        <select name="id_category" onChange={handleChange} value={value}>
            <option value={0}>Seleccionar categoria</option>
            {categories.map(category => (
                <option key={category.id} value={category.id}>{category.nombre}</option>
            ))}
        </select>
    );
};

export default CategorySelect;
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';

const PresentationSelect = ({ route, handleChange, categoryId, value, edit, newProduct, setPresentation }) => {
    const cookies = new Cookies();
    const [ presentations, setPresentations ] = useState([]);
    const [ category, setCategory ] = useState([])

    useEffect(() => {
        if(edit.id === 0 && edit.edit === false){
            const requestInit = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };
    
            fetch(`${route}/api/presentation/${categoryId}?accesstoken=${cookies.get('token')}`, requestInit)
            .then(res => res.json())
            .then(data => setPresentations(data.data))
            .catch(error => {
                console.log('Error providing categories in product view: ' + error)
            });
        } else {
            const requestInit = {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/product/${newProduct.id_product}?accesstoken=${cookies.get('token')}`, requestInit)
            .then(res => res.json())
            .then(data => setCategory(data.data[0].id_categoria))
            .catch(error => {
                console.log('Error providing products in products view: ' + error)
            })

            fetch(`${route}/api/presentation/${category}?accesstoken=${cookies.get('token')}`, requestInit)
            .then(res => res.json())
            .then(data => setPresentations(data.data))
            .catch(error => {
                console.log('Error providing categories in product view: ' + error)
            });
        }
    });

    const handleChanging = e => {
        handleChange(e)
        setPresentation(e.target.options[e.target.selectedIndex].textContent)
    }

    return(
        <select id="id_presentation" name="id_presentation" onChange={handleChanging} value={value}>
            <option value={0}>SELECCIONAR PRESENTACIÓN</option>
            {presentations.map(presentation => (
                <option key={presentation.id} value={presentation.id} name={presentation.nomrbe}>{presentation.nomrbe}</option>
            ))}
        </select>
    );
};

export default PresentationSelect;
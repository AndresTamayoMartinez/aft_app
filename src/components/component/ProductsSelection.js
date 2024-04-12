import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';

const ProductSelection = ({ route, newProduct, setNewProduct, setProduct, setModalProduct}) => {
    const cookies = new Cookies();
    const [ products, setProducts ] = useState([]);
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

        fetch(`${route}/api/product?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setProducts(data.data))
        .catch(error => {
            console.log('Error providing products in products view: ' + error)
        })
    });

    const handleSearch = e => {
        setSearch(e.target.value);
    }

    const handleClick = e => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
        
        setProduct({
            name: products[e.target.value - 1].nombre,
            description: products[e.target.value - 1].descripcion,
            price: products[e.target.value - 1].precio,
            volume: products[e.target.value - 1].cantidad,
            stock: products[e.target.value - 1].stock,
            id_category: products[e.target.value - 1].id_categoria,
            id_brand: products[e.target.value - 1].id_marca
        });

        setModalProduct(false);
    }

    let productsResult = [];
    if(!search){
        productsResult = [];
    } else{
        productsResult = products.filter((productSearch) =>
            productSearch.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    return(
        <div className='table-responsive'>
            <input type='text' name='searchProduct' value={search} placeholder='Buscar empleado' onChange={handleSearch}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>MEDIDA</th>
                        <th>SELECCIONAR</th>
                    </tr>
                </thead>
                <tbody>
                    {productsResult.map(product => (
                        <tr key={product.id}>
                            <td name={product.id}>{product.id}</td>
                            <td name={product.nombre}>{product.nombre}</td>
                            <td name={product.precio}>{product.precio}</td>
                            <td name={product.medida}>{product.cantidad}</td>
                            <td><button id={product.id}name='id_product' value={product.id} onClick={handleClick}>SELECCIONAR</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductSelection;
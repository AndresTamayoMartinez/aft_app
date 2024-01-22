import '../css/ProductsTable.css'
import Cookies from 'universal-cookie';
import { useState } from 'react';

const ProductsTable = ({ route, products, setProduct, setEdit }) => {

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

        fetch(`${route}/api/product/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(() => {
            alert('Se ha eliminado el producto');
            window.location.href = window.location.href;
        })
        .catch(error => {
            console.log('Error eliminando el producto: ' + error)
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

        fetch(`${route}/api/product/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => {
            setEdit({
                id: e.target.id,
                edit: true
            })
            setProduct({
                name: data.data[0].nombre,
                description: data.data[0].descripcion,
                price: data.data[0].precio,
                volume: data.data[0].cantidad,
                stock: data.data[0].stock,
                id_category: data.data[0].id_categoria,
                id_brand: data.data[0].id_marca
            });
        })
        .catch(error => {
            console.log('Error editando el producto: ' + error)
        });
    };

    const handleSearch = e => {
        setSearch(e.target.value)
    };

    let productsResult = [];
    if(!search){
        productsResult = []
    } else{
        productsResult = products.filter((productSearch) =>
            productSearch.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    return(
        <div className='table-responsive'>
            <h1>Buscar Productos</h1>
            <input type='text' name='searchProduct' value={search} placeholder='Buscar Producto' onChange={handleSearch}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>PRECIO</th>
                        <th>STOCK</th>
                        <th>MEDIDA</th>
                        <th>MARCA</th>
                        <th>EDITAR</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {productsResult.map(product => (
                        <tr key={product.id}>
                            <td name={product.id}>{product.id}</td>
                            <td name={product.nombre}>{product.nombre}</td>
                            <td name={product.precio}>${product.precio}</td>
                            <td name={product.stock}>{product.stock}</td>
                            <td name={product.cantidad}>{product.cantidad}</td>
                            <td name={product.id_marca}>{product.id_marca}</td>
                            <td><button id={product.id} onClick={handleUpdate}>EDITAR</button></td>
                            <td><button id={product.id} onClick={handleDelete}>ELIMINAR</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductsTable;
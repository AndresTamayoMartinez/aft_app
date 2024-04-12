import '../css/SalesDetailTable.css'
import Cookies from 'universal-cookie';
import { useState } from 'react';

const ProductsTableSalesDetail = ({ route,
    setEdit,
    products,
    setNewProduct,
    saleDetail,
    setSaleDetail,
    setSubSubtotal,
    amountEdit,
    setAmountEdit
}) => {
    const cookies = new Cookies();
    const [ search, setSearch ] = useState("");
    const [ option, setOption ] = useState("");

    const idSale = cookies.get('idSale') || 0;

    const handleSubmit = e => {
        //Values asignation to logic
        saleDetail.abono = document.getElementById('abono').value;
        saleDetail.total = (saleDetail.subtotal - saleDetail.abono);
        //request to PUT subtotal in database
        const requestInitSubtotal = {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(saleDetail),
            headers: {
                'Access-Control-Allow-Origin': '*' ,
                'Content-type': 'application/json'
            }
        };
        //request to PUT subtotal in database
        fetch(`${route}/api/sale/${idSale}/${idSale}?accesstoken=${cookies.get('token')}`, requestInitSubtotal)
            .then(res => res.json())
            .then(data => {
                alert('Venta registrada');
            })
            .catch((error) => {
                alert('Error al : ', error)
            });
    };

    const handleDelete = e => {
        let cantidad = document.querySelector(`td[id="${e.target.id}"][name="cantidad"]`).textContent;
        cantidad = parseInt(cantidad);
        let subtotal = document.querySelector(`td[id="${e.target.id}"][name="subtotal"]`).textContent;
        subtotal = parseFloat(subtotal);
        saleDetail.subtotal = parseFloat(saleDetail.subtotal) - subtotal;
        saleDetail.abono = document.getElementById('abono').value;
        saleDetail.total = (saleDetail.subtotal - saleDetail.abono);

        //request to PUT stock in database
        const requestInitStock = {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({stock: cantidad}),
            headers: {
                'Access-Control-Allow-Origin': '*' ,
                'Content-type': 'application/json'
            }
        };
        //request to PUT stock in database
        fetch(`${route}/api/product/stock/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInitStock)
            .then(res => res.json())
            .then(data => console.log(data))
            .then(setEdit({
                id: 0,
                edit: false
            }))
            .catch((error) => {
                alert('Error al : ', error)
        });
        //request to PUT subtotal in database
        const requestInitSubtotal = {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(saleDetail),
            headers: {
                'Access-Control-Allow-Origin': '*' ,
                'Content-type': 'application/json'
            }
        };
        //fetch to PUT subtotal in database
        fetch(`${route}/api/sale/${idSale}/${idSale}?accesstoken=${cookies.get('token')}`, requestInitSubtotal)
            .then(res => res.json())
            .then(data => console.log(data))
            .then(setEdit({
                id: 0,
                edit: false
            }))
            .catch((error) => {
                alert('Error al : ', error)
        });
        //request to DELETE product sale detail
        const requestInitDelete = {
            method: 'DELETE',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*' ,
              'Content-type': 'application/json'
            }
        };
        //Fetch to delete a sale product
        fetch(`${route}/api/sale_detail/${idSale}/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInitDelete)
        .then(res => res.json())
        .then(() => {
            alert('Se ha eliminado el producto');
            //window.location.href = window.location.href;
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
        //Fetch to obtain Sale Detail
        fetch(`${route}/api/sale_detail/${idSale}/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => {
            setEdit({
                id: e.target.id,
                edit: true
            });

            setNewProduct({
                id_sale: idSale,
                id_product: data.data[0].id_producto,
                id_presentation: data.data[0].id_presentacion,
                amount: data.data[0].cantidad,
                price: data.data[0].precio,
                subtotal: data.data[0].subtotal,
                delivered: data.data[0].entregado
            });

            amountEdit.amount = data.data[0].cantidad;
            setSubSubtotal(data.data[0].subtotal);
        })
        .catch(error => {
            console.log('Error editando la venta: ' + error)
        });
        //Fetch to obtain product
        fetch(`${route}/api/product/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => {
            if(e.target.name == "METRO" || e.target.name == "TRAMO"){
                amountEdit.presentation = e.target.name;
                amountEdit.cantidad = data.data[0].cantidad;
            }
        })
        .catch(error => {
            console.log('Error editando el producto: ' + error)
        });
    };

    const handleChange = e => {
        setSaleDetail({
            ...saleDetail,
            abono: e.target.value
        })
    }

    const handleSearch = e => {
        setSearch(e.target.value)
    };

    const handleOption = e => {
        setOption(e.target.value);
    }

    let productsResult = [];
    if(!search){
        productsResult = products;
    } else{
        if(option == "name"){
            productsResult = products.filter((productSearch) =>
                productSearch.nombre_producto.toLowerCase().includes(search.toLocaleLowerCase())
            )
        } else{
            productsResult = products.filter((productSearch) =>
                productSearch.id_producto.toString().includes(search)
            )
        }
    }

    return(
        <div className='table-responsive-detail'>
            <h1>Buscar Producto</h1>
            <input type='text' name='searchSale' value={search} placeholder='Buscar Producto' onChange={handleSearch}></input>
            <select name="salesSearch" onChange={handleOption}>
                <option value="id">ID</option>
                <option value="name">Nombre</option>
            </select>
            <div className='table-detail'>
                <table>
                    <thead>
                        <tr>
                            <th>ID PRODUCTO</th>
                            <th>NOMBRE</th>
                            <th>PRESENTACION</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th>SUBTOTAL</th>
                            <th>ENTREGADO</th>
                            <th>EDITAR</th>
                            <th>ELIMINAR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsResult.map(product => (
                            <tr key={product.id_producto}>
                                <td id={product.id_producto}>{product.id_producto}</td>
                                <td id={product.id_producto}>{product.nombre_producto}</td>
                                <td id={product.id_producto}>{product.nombre_presentacion}</td>
                                <td id={product.id_producto} name="cantidad">{product.cantidad}</td>
                                <td id={product.id_producto}>{product.precio}</td>
                                <td id={product.id_producto} name="subtotal">{product.subtotal}</td>
                                <td id={product.id_producto}>{product.entregado}</td>
                                <td><button id={product.id_producto} name={product.nombre_presentacion} onClick={handleUpdate}>EDITAR</button></td>
                                <td><button id={product.id_producto} onClick={handleDelete}>ELIMINAR</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='subtotal-div'>
                <div className='totaldiv'>
                    <label>Total</label>
                    <label>${saleDetail.subtotal}</label>
                </div>
                <div className='acuentadiv'>
                    <label>A cuenta:</label>
                    <input type="text" id='abono' onChange={handleChange} value={saleDetail.abono} />
                </div>
                <div className='buttonsdiv'>
                    <button onClick={handleSubmit}>Aceptar</button>
                    <button /*onClick={console.log('Imprimir Nota')}*/>Imprimir</button>
                </div>
            </div>
        </div>
    );
}

export default ProductsTableSalesDetail;
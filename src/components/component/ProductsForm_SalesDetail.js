import '../css/SalesDetailForm.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Cookies from 'universal-cookie';
import PresentationSelect from './PresentationSelect';

const ProductsFormSalesDetail = ({ route, 
    edit, 
    setEdit, 
    newProduct, 
    setNewProduct, 
    saleDetail, 
    subSubtotal, 
    presentation, 
    setPresentation, 
    amountEdit 
}) => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [ modalProduct, setModalProduct ] = useState(false);
    const [ productPresentation, setProductPresentation] = useState("")
    const [ product, setProduct ] = useState({
        name: '',
        description: '',
        price: 0,
        volume: 0,
        stock: 0,
        id_category: 0,
        id_brand: 0
    });
    const [ editProduct, setEditProduct ] = useState({
        id_product: 0,
        id_presentation: 0,
        amount: 0,
        price: 0,
        subtotal: 0,
        delivered: "F"
    });

    const handleChange = e => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        })
        setProductPresentation(presentation)
    };

    const handleSubmit = (e) => {
        const idSale = cookies.get('idSale');
        if(newProduct.id_product === 0 || newProduct.id_presentation === 0 || newProduct.amount === 0 || newProduct.price === 0 || newProduct.delivered === ''){
            alert("Todos los campos son obligatorios");
            return;
        }
        if(edit.id === 0 && edit.edit === false){
            //Values asignation to logic
            newProduct.id_sale = idSale;
            newProduct.subtotal = (newProduct.amount * newProduct.price);
            saleDetail.subtotal += newProduct.subtotal;
            let stock = 0;
            if(productPresentation == "CAJA" || productPresentation == "TRAMO"){
                stock= ((newProduct.amount * product.volume)*-1);
            } else{
                stock= ((newProduct.amount)*-1)
            }

            //Request to POST a product in database
            const requestInitProduct = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(newProduct),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };
            //fetch to POST a product in database
            fetch(`${route}/api/sale_detail?accesstoken=${cookies.get('token')}`, requestInitProduct)
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
            //request to PUT subtotal in database
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
            //request to PUT stock in database
            const requestInitStock = {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify({stock: stock}),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };
            //request to PUT stock in database
            fetch(`${route}/api/product/stock/${newProduct.id_product}?accesstoken=${cookies.get('token')}`, requestInitStock)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    alert('Error al : ', error)
            });
            //Set newProduct to initial values
            setNewProduct({
                id_sale: idSale,
                id_product: 0,
                id_presentation: 0,
                amount: 0,
                price: 0,
                subtotal: 0,
                delivered: "F"
            });
        } else{
            //Values asignation to logic
            editProduct.id_product = newProduct.id_product;
            editProduct.id_presentation = newProduct.id_presentation;
            editProduct.amount = newProduct.amount;
            editProduct.price = newProduct.price;
            editProduct.subtotal = (editProduct.amount * editProduct.price);
            editProduct.delivered = newProduct.delivered;
            let newSubtotal = (editProduct.subtotal - subSubtotal);
            saleDetail.subtotal += newSubtotal;
            //Falta que acomodes esto para que funcione con 
            let stock = 0;
            if(productPresentation == "CAJA" || productPresentation == "TRAMO"){
                stock= (((newProduct.amount * product.volume) - (amountEdit.amount * amountEdit.cantidad)) * -1);
            } else{
                console.log(amountEdit.amount * amountEdit.cantidad)
                stock= (((newProduct.amount) - (amountEdit.amount * amountEdit.cantidad))*-1)
                console.log(stock);
            }
            //Request to PUT a product
            const requestInit = {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(editProduct),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };
            //Fetch to PUT a product
            fetch(`${route}/api/sale_detail/${idSale}/${edit.id}?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    alert('Error al : ', error)
                    console.log('Error al : ', error)
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
            //request to PUT subtotal in database
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
            //request to PUT stock in database
            const requestInitStock = {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify({stock: stock}),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };
            //request to PUT stock in database
            fetch(`${route}/api/product/stock/${newProduct.id_product}?accesstoken=${cookies.get('token')}`, requestInitStock)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    alert('Error al : ', error)
            });
            //Set newProduct to initial values
            setNewProduct({
                id_sale: idSale,
                id_product: 0,
                id_presentation: 0,
                amount: 0,
                price: 0,
                subtotal: 0,
                delivered: "F"
            });
        }
    };

    return(
        <div>
            <h1>Registrar Producto</h1>
            <form onSubmit={handleSubmit}>
                <label>Producto</label>
                <div className='div_select'>
                    <input type="text" name='id_product' className='inpSelect' onChange={handleChange}  value={newProduct.id_product} />
                    <label onClick={() => {setModalProduct(true)}}>Seleccionar Producto</label>
                </div>
                <label>Presentación</label>
                <PresentationSelect 
                    route={route} 
                    handleChange={handleChange} 
                    categoryId={product.id_category} 
                    value={newProduct.id_presentation} 
                    edit={edit} 
                    newProduct={newProduct} 
                    setPresentation={setPresentation} 
                />
                <label>Cantidad</label>
                <input type="text" name='amount' className='inpLogin' onChange={handleChange} value={newProduct.amount}/>
                <label>Precio</label>
                <input type="text" name='price' className='inpLogin' onChange={handleChange} value={newProduct.price}/>
                <div className='div-delivered'>
                    <label>Entregado</label>
                    <select name='delivered' className='inpLogin' onChange={handleChange} value={newProduct.delivered}>
                        <option value={"E"}>ENTREGADO</option>
                        <option value={"F"}>POR ENTREGAR</option>
                    </select>
                </div>
                <input type='submit' name='sale_btn' value='Registrar'></input>
            </form>
            <Modal
                route={route}
                modalProduct={modalProduct}
                setModalProduct={setModalProduct}
                newProduct={newProduct}
                setNewProduct={setNewProduct}
                setProduct={setProduct}
            />
        </div>
    )
}

export default ProductsFormSalesDetail;
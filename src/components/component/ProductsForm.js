import '../css/ProductsForm.css'
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import BrandSelect from './BrandSelect';
import CategorySelect from "./CategorySelect";

const ProductsForm = ({ route, product, setProduct, edit, setEdit }) => {
    const cookies = new Cookies();

    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        if(product.name === '' || product.description === '' || product.price === '' || product.volume === '' || product.stock === '' || product.id_category === '' || product.id_brand === '' || product.id_category === 0 || product.id_brand === 0){
            alert("Todos los campos son obligatorios");
            return;
        }

        if(edit.id === 0 && edit.edit === false){
            const requestInit = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(product),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/sale_detail?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    alert('Error al : ', error)
            });

            setProduct({
                name: '',
                description: '',
                price: 0,
                volume: 0,
                stock: 0,
                id_category: 0,
                id_brand: 0
            });
            window.location.reload();
        } else{
            const requestInit = {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(product),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/product/${edit.id}?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    console.log('Error al : ', error)
            });

            setProduct({
                name: '',
                description: '',
                price: 0,
                volume: 0,
                stock: 0,
                id_category: 0,
                id_brand: 0
            });
            window.location.reload();
        }
    };

    return(
        <div className='form-responsive'>
            <h1>Registrar Productos</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input type="text" name='name' className='inpLogin' onChange={handleChange} value={product.name}/>
                <label>Descripción</label>
                <input type="text" name='description' className='inpLogin' onChange={handleChange} value={product.description} />
                <label>Precio</label>
                <input type="text" name='price' className='inpLogin' onChange={handleChange}  value={product.price}  />
                <label>Medida</label>
                <input type="text" name='volume' className='inpLogin' onChange={handleChange}  value={product.volume} />
                <label>Stock</label>
                <input type="text" name='stock' className='inpLogin' onChange={handleChange}  value={product.stock} />
                <label>Categoria</label>
                <CategorySelect route={route} /*setPresentations={setPresentations}*/handleChange={handleChange}  value={product.id_category} />
                {/* <label>PRESENTACIÓN</label>
                <PresentationSelect route={route} presentations={presentations} onChange={handleChange} /> */}
                <label>Marca</label>
                <BrandSelect route={route} handleChange={handleChange}  value={product.id_brand} />
                <input type='submit' name='product_btn' value='Registrar'></input>
            </form>
        </div>
    );
};

export default ProductsForm;
import '../css/ClientsForm.css'
import Cookies from 'universal-cookie';

const ClientsForm = ({ route, client, setClient, edit, setEdit }) => {
    const cookies = new Cookies();

    const handleChange = e => {
        setClient({
            ...client,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        if(client.name === '' || client.street === '' || client.colony === '' || client.city === '' || client.phone === ''){
            alert("Todos los campos son obligatorios");
            e.preventDefault();
            return;
        }

        if(edit.id === 0 && edit.edit === false){
            const requestInit = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(client),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/client?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    alert('Error al : ', error)
            });

            setClient({
                name: '',
                description: '',
                price: 0,
                volume: 0,
                stock: 0,
                id_category: 0,
                id_brand: 0
            });
        } else{
            const requestInit = {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(client),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/client/${edit.id}?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    console.log('Error al : ', error)
            });

            setClient({
                name: '',
                street: '',
                colony: '',
                city: '',
                phone: ''
            });

        }
    };

    return(
        <div className='form-responsive'>
            <h1>Registrar Clientes</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input type="text" name='name' className='inpLogin' onChange={handleChange} value={client.name}/>
                <label>Calle</label>
                <input type="text" name='street' className='inpLogin' onChange={handleChange} value={client.street} />
                <label>Colonia</label>
                <input type="text" name='colony' className='inpLogin' onChange={handleChange}  value={client.colony}  />
                <label>Ciudad</label>
                <input type="text" name='city' className='inpLogin' onChange={handleChange}  value={client.city} />
                <label>Telefono</label>
                <input type="text" name='phone' className='inpLogin' onChange={handleChange}  value={client.phone} />
                <input type='submit' name='client_btn' value='Registrar'></input>
            </form>
        </div>
    );
};

export default ClientsForm;
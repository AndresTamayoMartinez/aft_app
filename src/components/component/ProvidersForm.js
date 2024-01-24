import '../css/ProvidersForm.css'
import Cookies from 'universal-cookie';

const ProvidersForm = ({ route, provider, setProvider, edit, setEdit }) => {
    const cookies = new Cookies();

    const handleChange = e => {
        setProvider({
            ...provider,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        if(provider.name === '' || provider.street === '' || provider.colony === '' || provider.city === '' || provider.phone === ''){
            alert("Todos los campos son obligatorios");
            e.preventDefault();
            return;
        }

        if(edit.id === 0 && edit.edit === false){
            const requestInit = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(provider),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/provider?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    alert("Error al: ", error);
            });

            setProvider({
                business: '',
                name: '',
                phone: ''
            });
        } else{
            const requestInit = {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(provider),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/provider/${edit.id}?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    console.log('Error al : ', error)
            });

            setProvider({
                business: '',
                name: '',
                phone: ''
            });

        }
    };

    return(
        <div className='form-responsive'>
            <h1>Registrar Proveedores</h1>
            <form onSubmit={handleSubmit}>
                <label>Razon Social</label>
                <input type="text" name='business' className='inpLogin' onChange={handleChange} value={provider.business} />
                <label>Nombre</label>
                <input type="text" name='name' className='inpLogin' onChange={handleChange} value={provider.name}/>
                <label>Telefono</label>
                <input type="text" name='phone' className='inpLogin' onChange={handleChange}  value={provider.phone} />
                <input type='submit' name='provider_btn' value='Registrar'></input>
            </form>
        </div>
    );
};

export default ProvidersForm;
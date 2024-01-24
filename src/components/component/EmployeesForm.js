import '../css/EmployeesForm.css'
import Cookies from 'universal-cookie';

const EmployeesForm = ({ route, employee, setEmployee, edit, setEdit }) => {
    const cookies = new Cookies();

    const handleChange = e => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        if(employee.name === '' || employee.phone === '' || employee.position === '' || employee.user === '' || employee.password === ''){
            alert("Todos los campos son obligatorios");
            e.preventDefault();
            return;
        }

        if(edit.id === 0 && edit.edit === false){
            const requestInit = {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(employee),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/employee?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    alert('Error al : ', error)
            });

            setEmployee({
                name: '',
                phone: '',
                position: '',
                user: '',
                password: ''
            });
        } else{
            const requestInit = {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify(employee),
                headers: {
                    'Access-Control-Allow-Origin': '*' ,
                    'Content-type': 'application/json'
                }
            };

            fetch(`${route}/api/employee/${edit.id}?accesstoken=${cookies.get('token')}`, requestInit)
                .then(res => res.json())
                .then(data => console.log(data))
                .then(setEdit({
                    id: 0,
                    edit: false
                }))
                .catch((error) => {
                    console.log('Error al : ', error)
            });

            setEmployee({
                name: '',
                phone: '',
                position: '',
                user: '',
                password: ''
            });

        }
    };

    return(
        <div className='form-responsive'>
            <h1>Registrar employeees</h1>
            <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input type="text" name='name' className='inpLogin' onChange={handleChange} value={employee.name}/>
                <label>Telefono</label>
                <input type="text" name='phone' className='inpLogin' onChange={handleChange} value={employee.phone} />
                <label>Puesto</label>
                <input type="text" name='position' className='inpLogin' onChange={handleChange}  value={employee.position}  />
                <label>Usuario</label>
                <input type="text" name='user' className='inpLogin' onChange={handleChange}  value={employee.user} />
                <label>Contrasena</label>
                <input type="text" name='password' className='inpLogin' onChange={handleChange}  value={employee.password} />
                <input type='submit' name='employee_btn' value='Registrar'></input>
            </form>
        </div>
    );
};

export default EmployeesForm;
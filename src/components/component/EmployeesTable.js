import '../css/EmployeesTable.css'
import Cookies from 'universal-cookie';
import { useState } from 'react';

const EmployeesTable = ({ route, employees, setEmployee, setEdit }) => {

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

        fetch(`${route}/api/employee/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(() => {
            alert('Se ha eliminado el empleado');
            window.location.href = window.location.href;
        })
        .catch(error => {
            console.log('Error eliminando el empleado: ' + error)
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

        fetch(`${route}/api/employee/${e.target.id}?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => {
            setEdit({
                id: e.target.id,
                edit: true
            })
            setEmployee({
                name: data.data[0].nombre,
                phone: data.data[0].telefono,
                position: data.data[0].puesto,
                user: data.data[0].usuario,
                password: data.data[0].contrasena
            });
        })
        .catch(error => {
            console.log('Error editando el empleado: ' + error)
        });
    };

    const handleSearch = e => {
        setSearch(e.target.value)
    };

    let employeesResult = [];
    if(!search){
        employeesResult = []
    } else{
        employeesResult = employees.filter((employeeSearch) =>
            employeeSearch.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    return(
        <div className='table-responsive'>
            <h1>Buscar Empleado</h1>
            <input type='text' name='searchEmployee' value={search} placeholder='Buscar empleado' onChange={handleSearch}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>TELEFONO</th>
                        <th>POSICION</th>
                        <th>USUARIO</th>
                        <th>CONTRASEÑA</th>
                        <th>EDITAR</th>
                        <th>ELIMINAR</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesResult.map(employee => (
                        <tr key={employee.id}>
                            <td name={employee.id}>{employee.id}</td>
                            <td name={employee.nombre}>{employee.nombre}</td>
                            <td name={employee.telefono}>{employee.telefono}</td>
                            <td name={employee.puesto}>{employee.puesto}</td>
                            <td name={employee.usuario}>{employee.usuario}</td>
                            <td name={employee.contrasena}>{employee.contrasena}</td>
                            <td><button id={employee.id} onClick={handleUpdate}>EDITAR</button></td>
                            <td><button id={employee.id} onClick={handleDelete}>ELIMINAR</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeesTable;
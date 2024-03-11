import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';

const EmployeeSelection = ({ route, setSale, sale, setModalEmployee }) => {
    const cookies = new Cookies();
    const [ employees, setEmployees ] = useState([]);
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

        fetch(`${route}/api/employee?accesstoken=${cookies.get('token')}`, requestInit)
        .then(res => res.json())
        .then(data => setEmployees(data.data))
        .catch(error => {
            console.log('Error providing employees in employees view: ' + error)
        })
    });

    const handleSearch = e => {
        setSearch(e.target.value);
    }

    const handleClick = e => {
        setSale({
            ...sale,
            [e.target.name]: e.target.value
        });
        setModalEmployee(false);
    }

    let employeesResult = [];
    if(!search){
        employeesResult = [];
    } else{
        employeesResult = employees.filter((employeeSearch) =>
            employeeSearch.nombre.toLowerCase().includes(search.toLocaleLowerCase())
        );
    }

    return(
        <div className='table-responsive'>
            <input type='text' name='searchEmployee' value={search} placeholder='Buscar empleado' onChange={handleSearch}></input>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>POSICION</th>
                        <th>SELECCIONAR</th>
                    </tr>
                </thead>
                <tbody>
                    {employeesResult.map(employee => (
                        <tr key={employee.id}>
                            <td name={employee.id}>{employee.id}</td>
                            <td name={employee.nombre}>{employee.nombre}</td>
                            <td name={employee.puesto}>{employee.puesto}</td>
                            <td><button id={employee.id}name='id_employee' value={employee.id} onClick={handleClick}>SELECCIONAR</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeSelection;
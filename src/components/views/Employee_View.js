import '../css/EmployeesView.css';
import Cookies from 'universal-cookie';
import { useState, useEffect } from 'react';
import EmployeesTable from '../component/EmployeesTable';
import EmployeesForm from '../component/EmployeesForm';

const EmployeesView = ({ route }) => {

    const cookies = new Cookies();
    const [ employees, setEmployees ] = useState([]);
    const [ edit, setEdit] = useState({
        id: 0,
        edit: false
    })
    const [ employee, setEmployee ] = useState({
        name: '',
        phone: '',
        position: '',
        user: '',
        password: ''
    });

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

    return(
        <div className='max-width employees-content'>
            <div className='table-container'>
                <EmployeesTable route={route} employees={employees} setEmployee={setEmployee} edit={edit} setEdit={setEdit} setEmployees={setEmployees} />
            </div>
            <div className='employee-form'>
                <EmployeesForm route={route} employee={employee} setEmployee={setEmployee} edit={edit} setEdit={setEdit} />
            </div>
        </div>
    );
}

export default EmployeesView;
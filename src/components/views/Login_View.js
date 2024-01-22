import { useState } from 'react';
import Cookies from 'universal-cookie';
import '../css/Login.css'
import loginImage from '../img/login_image.jpg'

const LoginView = ({ route }) => {

  const cookies = new Cookies();
  const [ user, setUser ] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(user.username === '' || user.password === ''){
      alert("Todos los campos son obligatorios");
      return;
    }

    const requestInit = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(user),
      headers: {
        'Access-Control-Allow-Origin': '*' ,
        'Content-type': 'application/json'
      }
    };

    fetch(route + '/login/auth', requestInit)
      .then(res => res.json())
      .then(data => {
        if(data[0].message == "Usuario o contraseña incorrectos"){
          alert('Usuario o contraseña incorrectos')
          return
        } else{
          cookies.set('id', data[0].data[0].id, {path: "/"});
          cookies.set('name', data[0].data[0].nombre, {path: "/"});
          cookies.set('token', data[0].token, {path: "/"});
          window.location.href = window.location.href;
        }
      })
      .catch((error) => {
        alert('Error: ', error)
      });

    setUser({
      username: '',
      password: ''
    })
  };

  return(
    <div className='login-container'>
      <div className='content-container'>
        <div className='image-container'>
          <img src={loginImage} ></img>
        </div>
        <div className='form-container'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <h2>Usuario</h2>
            <input onChange={handleChange} type='text' name='username' className='inpLogin'></input>
            <h2>Contraseña</h2>
            <input onChange={handleChange} type='password' name='password' className='inpLogin'></input>
            <br></br>
            <input type='submit' name='login_btn' value={"Ingresar"}></input>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
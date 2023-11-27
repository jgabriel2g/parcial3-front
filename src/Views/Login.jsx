/* eslint-disable no-unused-vars */

import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom';
import DivInput from '../Components/DivInput';
import storage from '../Storage/storage';
import axios from 'axios';
import showAlert from '../Components/Functions'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const go = useNavigate();
  const login = async(e) => {
    const form =  {username: username, password:password};
    axios.post('/api/login', form)
          .then( function ({data}){
            console.log(data)
            showAlert('login exitoso', 'success'),
            storage.set('authToken', data.accessToken);
            storage.set('refreshToken', data.refreshToken);
            storage.set('authUser', data.data);
            if (data.data.role === 'ADMIN') {
              go('/');
            } else {
              go('/Sales');
            }
          })
          .catch(function (error){
           showAlert('Credenciales incorrectas', 'error')
          });
  }
  return (
    <div className='container-fluid'>
      <div className="row mt-5">
        <div className="col-md-4 offset-md-4">
            <div className="card border border-primary">
              <div className="card-header bg-primary border border-primary text-white text-center">
                LOGIN
              </div>
              <div className="card-body">
                <div>
                  <DivInput type='username' icon="fa-at" value={username} className='form-control' placeholder='Username' required='required' handleChange={(e) => setUsername(e.target.value)} />
                  <DivInput type='password' icon="fa-key" value={password} className='form-control' placeholder='Password' required='required' handleChange={(e) => setPassword(e.target.value)} />
                  <div className="d-grid col-10 mx-auto">
                    <button onClick={login} className="btn btn-dark">
                      <i className="fa-solid fa-door-open me-1"></i>
                      Iniciar sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login

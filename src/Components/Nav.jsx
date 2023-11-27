/* eslint-disable no-unused-vars */
import {Link, useNavigate} from "react-router-dom";
import storage from '../Storage/storage';
import React from 'react'

const Nav = () => {

  const go = useNavigate();
  const logout = async() => {
    storage.clear();
    go('/login');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-white bg-info">
    <div className="container-fluid">
      <a className="navbar-brand">COMPANY</a>
      <button className="navbar-toggler" type="button" data-bs-toggle-collapse="collapse">
        <span className="navbar-toggler-icon"></span>
      </button>
    </div>
    {storage.get("authUser") ? (
      <div className="collapse navbar-collapse" id="nav">
        <ul className="navbar-nav mx-auto align-items-center mb-2">
          <li className="nav-item px-lg-5 ">
            {storage.get("authUser").name}
          </li>
          {storage.get("authUser").role === "ADMIN" ? (
              <li className="nav-item px-lg-5 ">
                <Link to="/" className="nav-link">Productos</Link>
              </li>
            ) : ''
          }
          { storage.get("authUser").role === "ADVISER" ? (
              <li className="nav-item px-lg-5 ">
                <Link to="/Sales" className="nav-link">Ventas</Link>
              </li>
            ) : ''
          }
        </ul>
        <ul className="navbar-nav mx-auto mb-2">
          <li className="nav-item px-lg-5 ">
            <button className="btn btn-info" onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    ) : ''
    }
  </nav>
  )
}

export default Nav

/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import storage from '../../Storage/storage';
import axios from 'axios';
import Swal from "sweetalert2";
import showAlert from '../../Components/Functions';
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import {Link} from 'react-router-dom';

const Sales = () => {

  const [sales, setSales] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('');
  const headers = {
    Authorization: 'Bearer ' + storage.get('authToken')
  };

  useEffect( () => {
    getSales();
  }, []);

  const  getSales = async () => {
    axios.get('/sales', headers )
    .then( function ({data}){
      setSales(data);
      setClassTable('');
      setClassLoad('d-none');
    });
  };

  const deleteSales = async(id, name) => {
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
      title: 'Are you sure delete ' + name + '?',
      icon: 'question', showCancelButton:true,
      confirmButtonText: ' Yes, delete',
      cancelButtonText:' Cancel'
    }).then((result) => {
      if(result.isConfirmed){
        axios.delete('/sales/'+ id, headers)
          .then( function (resp) {
            console.log(resp);
            showAlert('Venta eliminada', 'success');
            getSales();
          })
          .catch( function (err)  {
              console.log(err);
              showAlert('Venta no pudo ser eliminada', 'warning');
          });
      }
    });
  };

  return (
    <div className="container-fluid">
      <DivAdd>
        <Link to='/createSales' className='btn btn-dark'>
          <i className='fa-solid fa-plus me-2'></i>
          Agregar venta
        </Link>
      </DivAdd>
      <DivTable col='6' off='3' classLoad={classLoad} classTable={classTable} >
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Unidades compradas</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            { sales.map((row, i) => (
                <tr key={row.id}>
                  <td>{i + 1}</td>
                  <td>{row.client_name}</td>
                  <td>{row.client_phone}</td>
                  <td>{row.price}</td>
                  <td>{row.amount}</td>
                  <td>
                    <Link to={'/editSales/' + row.id} className='btn btn-warning'>
                      <i className='fa-solid fa-edit'></i>
                    </Link>
                  </td>
                  <td>
                    <button className='btn btn-danger' onClick={() => deleteSales(row.id, row.client_name)}>
                        <i className='fa-solid fa-trash'></i>
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </DivTable>
    </div>
  )
}

export default Sales

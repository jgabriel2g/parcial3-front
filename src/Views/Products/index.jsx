/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import DivAdd from '../../Components/DivAdd';
import DivTable from '../../Components/DivTable';
import {Link} from 'react-router-dom';
import showAlert from '../../Components/Functions';
import Swal from "sweetalert2";
import axios from 'axios';
import storage from '../../Storage/storage';

const Products = () => {

  const [products, setProducts] = useState([]);
  const [classLoad, setClassLoad] = useState('');
  const [classTable, setClassTable] = useState('');
  const headers = {
    Authorization: 'Bearer ' + storage.get('authToken')
  };
  useEffect( () => {
    getProducts();
  }, []);

  const getProducts = async() => {
    console.log(headers)
    axios.get('/products', { headers: headers } )
    .then( function ({data}){
      setProducts(data);
      setClassTable('');
      setClassLoad('d-none');
    });
  };

  const deleteProduct = async(id, name) => {
    const alert = Swal.mixin({buttonsStyling:true});
    alert.fire({
      title: 'Are you sure delete ' + name + '?',
      icon: 'question', showCancelButton:true,
      confirmButtonText: ' Yes, delete',
      cancelButtonText:' Cancel'
    }).then((result) => {
      if(result.isConfirmed){
        axios.delete('/products/'+ id, { headers: headers })
          .then( function (resp) {
            console.log(resp);
            showAlert('Producto eliminado', 'success');
            getProducts();
          })
          .catch( function (err)  {
              console.log(err);
              showAlert('Producto no pudo ser eliminado', 'warning');
          });
      }
    });
  };
  return (
    <div className="container-fluid">
      <DivAdd>
        <Link to='/createProducts' className='btn btn-dark'>
          <i className='fa-solid fa-plus me-2'></i>
          Agregar productos
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
              <th># en stock</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            { products.map((row, i) => (
                <tr key={row.id}>
                  <td>{i + 1}</td>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>{row.price}</td>
                  <td>{row.stock}</td>
                  <td>
                    <Link to={'/editProducts/' + row.id} className='btn btn-warning'>
                      <i className='fa-solid fa-edit'></i>
                    </Link>
                  </td>
                  <td>
                    <button className='btn btn-danger' onClick={() => deleteProduct(row.id, row.name)}>
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

export default Products

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import storage from '../Storage/storage';
import DivInput from './DivInput'
import showAlert from './Functions';
const FormProd = (params) => {
  const [name,setName] = useState('');
  const NameInput = useRef();
  const [description,setDescription] = useState('');
  const DescriptionInput = useRef();
  const [price,setPrice] = useState('');
  const PriceInput = useRef();
  const [stock,setStock] = useState('');
  const StockInput = useRef();

  let url = '/products';
  const headers = {
    Authorization: 'Bearer ' + storage.get('authToken')
  };
  useEffect( () => {
    getProduct();
  }, []);

  const getProduct = async () => {
    if(params.id !== null){
      axios.get(url+'/'+params.id, headers)
          .then( function(resp)  {
            setName(resp.data.name)
            setDescription(resp.data.description)
            setPrice(resp.data.price)
            setStock(resp.data.stock)
          })
          .catch( function (err) {
            console.log(err);
          })
    }
  };

  const save = async(e) => {
    e.preventDefault();
    const form = {
      name:name,
      price: Number(price),
      description: description,
      stock: Number(stock)
    }
    console.log(form)
    if (params.id !== null) {
      url = '/products/'+params.id
      axios.patch(url,form, headers)
            .then( function (resp) {
              showAlert('Producto actualizado', 'success')
              window.location.href = '/'
            }).catch(function (err) {
              showAlert('Producto no pudo ser editado', 'warning')
            })
          } else {
            axios.post(url,form, headers)
            .then(function (resp){
              showAlert('Producto creado', 'success')
              window.location.href = '/';
              setName('');
              setDescription('');
              setPrice(0);
              setStock('');
            }).catch(function (error) {
              showAlert('Producto no pudo ser creado', 'warning')
            })
    }
  }

  return (
    <div className='container-fluid'>
      <div className="row mt-5 col-md-4 offset-md-4">
        <div className="card border border-info bg-info">
          <div className="card-header ">
            {params.title}
          </div>
          <div className="card-body">
            <div>

              <DivInput placeholder='Nombre del producto' type='text' icon='fa-building' value={name} className='form-control' required='required' ref={NameInput} handleChange={(e) => setName(e.target.value)}/>
              <DivInput placeholder='Precio del producto' type='text' icon='fa-building' value={price} className='form-control' required='required' ref={PriceInput} handleChange={(e) => setPrice(e.target.value)}/>
              <DivInput placeholder='Descripcion del producto' type='text' icon='fa-building' value={description} className='form-control' required='required' ref={DescriptionInput} handleChange={(e) => setDescription(e.target.value)}/>
              <DivInput placeholder='Número de productos en stock' type='text' icon='fa-building' value={stock} className='form-control' required='required' ref={StockInput} handleChange={(e) => setStock(e.target.value)}/>
                <div className="d-grid col-10 mx-auto">
                  <button onClick={save} className="btn btn-dark">
                    <i className="fa-solid fa-save me-2"></i>
                    Guardar
                  </button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormProd

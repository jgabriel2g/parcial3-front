/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import storage from '../Storage/storage';
import DivInput from './DivInput'
import showAlert from './Functions';
const FormSales = (params) => {

  const [clientName,setClientName] = useState('');
  const clientNameInput = useRef();
  const [clientPhone,setClientPhone] = useState('');
  const clientPhoneInput = useRef();
  const [amount,setAmount] = useState('');
  const AmountInput = useRef();
  const [price,setPrice] = useState('');
  const PriceInput = useRef();
  const [product,setProduct] = useState('');
  const ProductInput = useRef();
  const [products, setProducts] = useState([]);

  let url = '/sales';
  const headers = {
    Authorization: 'Bearer ' + storage.get('authToken')
  };

  useEffect( () => {
    getProducts();
    getSale();
  }, []);

  const getSale = async () => {
    if(params.id !== null){
      axios.get(url+'/'+params.id, { headers: headers })
          .then( function(resp)  {
            setClientName(resp.data.client_name)
            setClientPhone(resp.data.client_phone)
            setPrice(resp.data.price)
            setAmount(resp.data.amount)
            setProduct(resp.data.product_id)
          })
          .catch( function (err) {
          })
    }
  };

  const getProducts = async() => {
    axios.get('/products', { headers: headers } )
    .then( function ({data}){
      setProducts(data);
    });
  };

  const save = async(e) => {
    e.preventDefault();
    const form = {
      client_name: clientName,
      client_phone: clientPhone,
      amount: Number(amount),
      price: Number(price),
      product_id: Number(product)
    };

    console.log(form)
    if (params.id !== null) {
      url = '/sales/'+params.id
      axios.patch(url,form, { headers: headers })
            .then( function () {
              showAlert('Venta actualizada', 'success');
              window.location.href = '/Sales'
            }).catch(function (err) {
              showAlert('Venta no pudo ser editada', 'warning');
            })
          } else {
            axios.post(url,form, { headers: headers })
            .then(function (){
              showAlert('Venta creada', 'success');
              window.location.href = '/Sales';
              setClientName('');
              setClientPhone('');
              setPrice(0);
              setAmount('');
            }).catch(function (err) {
              showAlert('Venta no pudo ser creada', 'warning');

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
            <DivInput placeholder='Nombre del cliente' type='text' icon='fa-building' value={clientName} className='form-control' required='required' ref={clientNameInput} handleChange={(e) => setClientName(e.target.value)}/>
            <DivInput placeholder='Teléfono del cliente' type='text' icon='fa-building' value={clientPhone} className='form-control' required='required' ref={clientPhoneInput} handleChange={(e) => setClientPhone(e.target.value)}/>
            <DivInput placeholder='Precio de venta' type='text' icon='fa-building' value={price} className='form-control' required='required' ref={PriceInput} handleChange={(e) => setPrice(e.target.value)}/>
            <select className="form-select mb-2" value={product} ref={ProductInput}  onChange={(e) => setProduct(e.target.value)} aria-label="Default select example">
              <option value='0'>Selecciona un producto</option>
              { products.map((row, i) => (
                <option key={row.id} value={row.id}>{row.name} </option>
              ))};
            </select>
            <DivInput placeholder='Unidades' type='text' icon='fa-building' value={amount} className='form-control' required='required' ref={AmountInput} handleChange={(e) => setAmount(e.target.value)}/>
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

export default FormSales

// {product_id, client_name, client_phone, amount, price}

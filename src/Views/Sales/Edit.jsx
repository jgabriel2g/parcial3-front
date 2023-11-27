/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams } from 'react-router-dom'
import FormSales from '../../Components/FormSales';

const Edit = () => {
  const {id} = useParams();
  return (
    <FormSales id={id} title='Editar venta'></FormSales>

  )
}

export default Edit

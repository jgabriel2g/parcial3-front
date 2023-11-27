/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import FormProd from '../../Components/FormProd'

const Edit = () => {

  const {id} = useParams();
  return (
    <FormProd id={id} title='Editar producto'></FormProd>

  )
}

export default Edit

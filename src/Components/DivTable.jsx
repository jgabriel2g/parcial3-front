/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

const DivTable = ({children, col, off, classLoad, classTable}) => {
  return (
    <div className='row mt-3'>
      <div className={'col-md-'+col+' offset-md-'+off}>
        <div className={'card border border-white text-center d-none ' + classLoad}>
          <div className="card-body">
            <i className="fa-solid fa-spinner"></i>
          </div>
        </div>
        <div className={'table-responsive' + classTable }>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DivTable

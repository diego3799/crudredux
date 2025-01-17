import React, { useState } from 'react'

import { crearNuevoProductoAction } from '../actions/productosActions'
import { useDispatch, useSelector } from 'react-redux'
import {
  mostrarAlertaAction,
  ocultarAlertaAction,
} from '../actions/alertaActions'
const NuevoProducto = ({ history }) => {
  /**Te crea una funcion  */
  const [nombre, setNombre] = useState('')
  const [precio, setPrecio] = useState(0)
  const dispatch = useDispatch()

  /**acceder al state del store */
  const { loading, error } = useSelector((state) => state.productos)
  const { alerta } = useSelector((state) => state.alerta)
  const agregarProducto = (producto) =>
    dispatch(crearNuevoProductoAction(producto))
  const submitNuevoProducto = (e) => {
    e.preventDefault()
    if (nombre.trim() === '' || precio <= 0) {
      const respuesta = {
        msg: 'Ambos campos son obligatorios',
        classes: 'alert alert-danger text-center text-uppercase p3',
      }
      return dispatch(mostrarAlertaAction(respuesta))
    }

    //validar formulario
    //si no hay errores
    dispatch(ocultarAlertaAction())
    //crear el nuevo producto
    agregarProducto({ nombre, precio })
    history.push('/')
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta && <p className={alerta.classes}>{alerta.msg}</p>}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio del Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio del Producto"
                  name="precio"
                  value={precio}
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {loading && <p>Cargando...</p>}
            {error && (
              <p className="alert alert-danger p2 mt-4 text-center">
                Hubo un error
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto

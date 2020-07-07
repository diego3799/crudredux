import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useParams, useHistory } from 'react-router-dom'
import { editarProductoAction } from '../actions/productosActions'

const EditarProducto = ({ history }) => {
  const dispatch = useDispatch()
  // const history = useHistory()
  const [producto, guardarProducto] = useState({
    nombre: '',
    precio: '',
  })
  const { productoEditar } = useSelector((state) => state.productos)
  const { nombre, precio } = producto
  /** TODO: Alternate to get the params of the URL */
  //const { id } = useParams()
  useEffect(() => {
    guardarProducto(productoEditar)
  }, [productoEditar])
  const onChangeForm = (e) => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value,
    })
  }

  const submitEditarProducto = (e) => {
    e.preventDefault()

    dispatch(editarProductoAction(producto))
    history.push('/')
  }
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Producto
            </h2>
            <form onSubmit={submitEditarProducto}>
              <div className="form-group">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={onChangeForm}
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
                  onChange={onChangeForm}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto

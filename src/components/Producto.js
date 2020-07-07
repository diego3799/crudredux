import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from '../actions/productosActions'
import Swal from 'sweetalert2'

const Producto = ({ producto }) => {
  const dispatch = useDispatch()
  const history = useHistory()

  const confirmarEliminarProducto = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        dispatch(borrarProductoAction(id))
      }
    })
  }
  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto))
    history.push(`/productos/editar/${producto.id}`)
  }

  return (
    <tr>
      <td>{producto.nombre}</td>
      <td>
        <span className="font-weight-bold ">$ {producto.precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redireccionarEdicion(producto)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => confirmarEliminarProducto(producto.id)}
          type="button"
          className="btn btn-danger"
        >
          Eliminar
        </button>
      </td>
    </tr>
  )
}

export default Producto

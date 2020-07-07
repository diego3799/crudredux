import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_ERROR,
  COMENZAR_DESCARGA_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from '../types'
import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

/**Obtener productos */
export function getProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos())
    try {
      const r = await clienteAxios.get('/productos')
      dispatch(descargarProductosExitosa(r.data))
    } catch (error) {
      console.log(error)
      dispatch(descargarProductosError())
    }
  }
}

//crear nuevos productos

export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto())
    try {
      await clienteAxios.post('/productos', producto)
      dispatch(agregarProductoExito(producto))
      Swal.fire('Correcto', 'El producto se agregó correctamente', 'success')
    } catch (error) {
      console.log(error)
      dispatch(agregarProductoError(true))

      Swal.fire('Error', 'El producto no se agregó correctamente', 'error')
    }
  }
}

//Selecciona y elimina el producto
export function borrarProductoAction(id) {
  console.log(id)
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id))
    try {
      await clienteAxios.delete(`/productos/${id}`)
      dispatch(eliminarProductoExito())
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
    } catch (error) {
      console.log(error)
      dispatch(eliminarProductoError())
    }
  }
}

export function obtenerProductoEditar(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoAction(producto))
  }
}

export function editarProductoAction(producto) {
  return async (dispatch) => {
    dispatch(editarProducto(producto))
    try {
      await clienteAxios.put(`/productos/${producto.id}`, producto)
      dispatch(editarProductoExito(producto))
    } catch (error) {
      console.log(error)
      dispatch(editarProductoError())
    }
  }
}
const editarProductoError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
})
const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
})
const editarProducto = (producto) => ({
  type: COMENZAR_EDICION_PRODUCTO,
  payload: producto,
})

const obtenerProductoAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
})
const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
})
const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
})
const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
})

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
})
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
})
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
})
const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
})

const descargarProductosExitosa = (productos) => ({
  type: COMENZAR_DESCARGA_EXITO,
  payload: productos,
})

const descargarProductosError = () => ({
  type: COMENZAR_DESCARGA_ERROR,
})

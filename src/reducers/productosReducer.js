import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_ERROR,
  AGREGAR_PRODUCTO_EXITO,
  COMENZAR_DESCARGA_PRODUCTOS,
  COMENZAR_DESCARGA_EXITO,
  COMENZAR_DESCARGA_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from '../types'

//cada reducer tiene su propio state

const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoEliminar: null,
  productoEditar: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: true,
      }
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
      }

    case COMENZAR_DESCARGA_PRODUCTOS:
      return {
        ...state,
        loading: true,
      }
    case COMENZAR_DESCARGA_EXITO:
      return {
        ...state,
        loading: false,
        error: false,
        productos: action.payload,
      }
    case AGREGAR_PRODUCTO_ERROR:
    case PRODUCTO_EDITADO_ERROR:
    case PRODUCTO_ELIMINADO_ERROR:
    case COMENZAR_DESCARGA_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      }
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminar: action.payload,
      }
    case PRODUCTO_ELIMINADO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          (item) => item.id !== state.productoEliminar,
        ),
        productoEliminar: null,
      }

    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        productoEditar: action.payload,
      }
    case PRODUCTO_EDITADO_EXITO:
      return {
        ...state,
        productoEditar: null,
        productos: state.productos.map((item) =>
          item.id === action.payload.id ? (item = action.payload) : item,
        ),
      }

    default:
      return state
  }
}

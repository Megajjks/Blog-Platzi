import axios from "axios";
import { TRAER_TODAS, CARGANDO, ERROR, UPDATE_INPUTS, TAREA_AGREGADA, ACTUALIZAR, LIMPIAR } from "../types/tareasTypes";

export const traerTodas = () => async dispatch => {
    dispatch({
        type:CARGANDO
    });
    try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const tareas = {};
    response.data.map((tar) =>(
        tareas[tar.userId] ={
            ...tareas[tar.userId],
            [tar.id]:{
                ...tar
            }
        }        
    ));

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    });
  } catch (error) {
      console.log('Error: ' + error.message);
      dispatch({
          type:ERROR,
          payload: 'Información de usuarios no disponible'          
      });
  }
};

export const changedInput = (name, value) => (dispatch, getState) =>{
    const reducer = getState().tareasReducer;
    const reducer_update = {...reducer, [name]:value}
    dispatch({
        type:UPDATE_INPUTS,
        payload:reducer_update
    })
}

export const agregar = (nueva_tarea) => async(dispatch) =>{
    dispatch({
        type: CARGANDO
    })

    try{
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea);
        console.log(respuesta.data)
        dispatch({
            type:TAREA_AGREGADA
        })
    }catch (error){
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Intente más tarde'
        })
    }
}

export const editar = (tarea_editada) => async(dispatch) =>{
    dispatch({
        type: CARGANDO
    })

    try{
        const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada);
        console.log(respuesta.data)
        dispatch({
            type:TAREA_AGREGADA
        })
    }catch (error){
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Intente más tarde'
        })
    }
}

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) =>{
    const {tareas} = getState().tareasReducer;
    const seleccionada = tareas[usu_id][tar_id];
    const actualizadas = {
        ...tareas
    }
    actualizadas[usu_id] = {
        ...tareas[usu_id]
    }
    actualizadas[usu_id][tar_id] = {
        ...tareas[usu_id][tar_id],
        completed: !seleccionada.completed
    }
    dispatch({
        type:ACTUALIZAR,
        payload: actualizadas
    })
}

export const eliminar = (tar_id) => async (dispatch) =>{
    dispatch({
        type:CARGANDO
    })

    try{
        const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`)
        console.log(respuesta.data)
        dispatch({
            type:TRAER_TODAS,
            payload: {}
        })
    }catch(error){
        console.log(error.message)
        dispatch({
            type:ERROR,
            payload:'No se puede eleminar por el momento, intente más tarde'
        })
    }
}

export const limpiarForma = () => (dispatch) =>{
    dispatch({
        type: LIMPIAR
    })
}
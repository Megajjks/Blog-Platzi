import { ACTUALIZAR, CARGANDO, ERROR, COM_CARGANDO, COM_ERROR, COM_ACTUALIZAR } from "../types/publicacionesTypes";
import axios from 'axios';
import * as usuariosTypes from '../types/usuariosTypes';

const{TRAER_TODOS: USUARIOS_TRAER_TODOS} = usuariosTypes;

/* export const traerTodos = () => async (dispatch) =>{
    dispatch({
        type:CARGANDO
    });
    try{
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch({
            type: TRAER_TODOS,
            payload: respuesta.data
        });
    }catch (error){
        console.log('Error: ' + error.message);
        dispatch({
            type:ERROR,
            payload: error.message          
        });
    }
}
 */
export const traerPorUsuario = (key) => async (dispatch, getState) =>{
    
    dispatch({
       type:CARGANDO 
    });
    
    //Consiguiendo el Id del usuario
    const { usuarios } = getState().usuariosReducer; //tomo el state actual del reducer usuarios
    const { publicaciones } = getState().publicacionesReducer; //tomo el state de publicaciones previo
    const usuario_id = usuarios[key].id; //Obtengo el Id del usuario.
    
    
    try{
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`);
        // tratando los comentarios
        const nuevas = respuesta.data.map((publicacion)=>({
            ...publicacion,
            comentarios:[],
            abierto: false
        }));
        
        //Evitando que las publicaciones anteriores se pierdan    
        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ];


        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        });

        //
        const publicaciones_key = publicaciones_actualizadas.length -1;
        const usuarios_actulizados = [...usuarios];
        usuarios_actulizados[key] = {
            ...usuarios[key],
            publicaciones_key
        }

        dispatch({
            type:USUARIOS_TRAER_TODOS,
            payload: usuarios_actulizados
        })

    }catch (error){
        console.log('Error: ' , error.message);
        dispatch({
            type:ERROR,
            payload: 'publicaciones no disponibles'
        });
    }
}

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key] //Var encargada de tener la publicación seleccionada con el estado de si le di click
    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };

    const publicaciones_actualizadas = [...publicaciones];
    publicaciones_actualizadas[pub_key] = [
        ...publicaciones[pub_key]
    ];
    publicaciones_actualizadas[pub_key][com_key] = actualizada; 
    
    dispatch({
        type: COM_ACTUALIZAR,
        payload: publicaciones_actualizadas
    });    
}

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
   
    dispatch({
        type:COM_CARGANDO
    });

    //Selecciono la publicación correspondiente
    const { publicaciones } = getState().publicacionesReducer;
    const seleccionada = publicaciones[pub_key][com_key] //Var encargada de tener la publicación seleccionada con el estado de si le di click

    try{
        //traigo los comentarios
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)
        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        };

        //inmutabilidad 
        const publicaciones_actualizadas = [...publicaciones];
        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ];
        publicaciones_actualizadas[pub_key][com_key] = actualizada; 
        
        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        });

    }catch(error){
        console.log(error.message);
        dispatch({
            type: COM_ERROR,
            payload:'Comentarios no disponibles'
        });
    }   

}
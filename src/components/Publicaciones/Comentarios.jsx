import React from 'react'
import { connect } from 'react-redux'
import MinSpinner from '../General/MinSpinner';
import MinFatal from '../General/MinFatal';

const Comentarios = (props) => {
    
    if(props.com_error){
        return <MinFatal mensaje={props.com_error}/>
    }

    if(props.com_cargando && !props.comentarios.length){
        return <MinSpinner/>
    }

    const ponerComentarios = () =>(
        props.comentarios.map((comentario) =>(
            <li key = {comentario.id}>
                <b>
                    <u>{comentario.email}</u>
                </b>
                <br/>
                    {comentario.body}
            </li>
        ))
    );    
    
    return (
        <ul>
           { ponerComentarios()}
        </ul>
    )
}

const mapStateToProps = ({ publicacionesReducer }) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios);

import React from 'react'
import { connect } from 'react-redux'
import MinSpinner from '../General/MinSpinner';
import MinFatal from '../General/MinFatal';
import Zoom from 'react-reveal/Zoom';

import '../../css/comentarios.css';

const Comentarios = (props) => {
    
    if(props.com_error){
        return <MinFatal mensaje={props.com_error}/>
    }

    if(props.com_cargando && !props.comentarios.length){
        return <MinSpinner/>
    }

    const ponerComentarios = () =>(
        props.comentarios.map((comentario) =>(
            <Zoom>
                <li key = {comentario.id}>
                    <div className="comentario-container">
                        <div className="comentario-head">
                            <img className="img-round-comentario" src={`https://avatars.dicebear.com/v2/avataaars/${comentario.id}.svg`} alt="comentario-user"/>
                            <p className="comentario-email">{comentario.email}</p>
                        </div>
                        <p className="comentario-body">{comentario.body}</p>
                    </div>
                </li>
            </Zoom>
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

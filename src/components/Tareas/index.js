import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as tareasAction from '../../actions/tareasAction';

class Tareas extends Component {
    
    componentDidMount(){
        if(!Object.keys(this.props.tareas).length){
            this.props.traerTodas()
        }
    }

    componentDidUpdate(){
        if(!Object.keys(this.props.tareas).length && !this.props.cargando){
            this.props.traerTodas()
        }
    }
    
    mostrarContenido = () =>{
        const { tareas, cargando, error } = this.props //destructurando
        if(cargando){
            return <Spinner/>
        }
        if(error){
            return <Fatal mensaje={error}/>
        }

        return Object.keys(tareas).map((usu_id)=>(
            <div key={usu_id}>
                <h2>Usuario {usu_id}</h2>
                <div className="contenedor_tareas">{this.ponerTareas(usu_id)}</div>
            </div>
        ))
    };

    ponerTareas = (usu_id) =>{
        const { tareas, cambioCheck, eliminar } = this.props; //destructurando para sacar las tareas
        const por_usuario ={
            ...tareas[usu_id]
        };
        return Object.keys(por_usuario).map((tar_id) =>(
            <div key={tar_id}>
                <input 
                    type="checkbox" 
                    defaultChecked={por_usuario[tar_id].completed}
                    onChange = { () => cambioCheck(usu_id, tar_id)}
                />
                {
                    por_usuario[tar_id].title
                }
                <button>
                    <Link to={`/tareas/editar/${usu_id}/${tar_id}`}>Editar</Link>
                </button>
                <button onClick={ () => eliminar(tar_id) }>
                    Eliminar
                </button>
            </div>
        ))
    }

    render() {
        return (
            <div>
                <button>
                    <Link to='/tareas/guardar'>agregar</Link>
                </button>
                {this.mostrarContenido()}
            </div>
        )
    }
}

const mapStateToProps = ({ tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasAction)(Tareas);
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import MinSpinner from "../General/MinSpinner";
import MinFatal from "../General/MinFatal";

import * as tareasActions from "../../actions/tareasAction";

class Guardar extends Component {
  componentDidMount() {
      //destructuramos
      const{
          match:{ params: { usu_id, tar_id} },
          tareas,
          changedInput,
          limpiarForma
      } = this.props
      if(usu_id && tar_id){
          const tarea = tareas[usu_id][tar_id]
          changedInput('usuario_id',tarea.userId);
          changedInput('titulo',tarea.title);
      }else{
          limpiarForma()
      }    
  }

  handleChange = e => {
    this.props.changedInput(e.target.name, e.target.value);
  };

  onSave = e => {
    const {
        match:{ params: { usu_id, tar_id} }, 
        tareas,
        usuario_id, 
        titulo, 
        agregar,
        editar  
    } = this.props;
    const nueva_tarea = {  
      usuario_id: usuario_id,
      titulo: titulo,
      completed: false,  
    };

    if(usu_id && tar_id){
        const tarea = tareas[usu_id][tar_id]
        const tarea_editada = {
            ...nueva_tarea,
            completed:tarea.completed,
            id:tarea.id
        }
        editar(tarea_editada)
    }else{
        agregar(nueva_tarea);
    }
  };

  deshabilitarBtn = () => {
    const { usuario_id, titulo, cargando } = this.props;
    if (cargando) {
      return true;
    }
    if (!usuario_id || !titulo) {
      return true;
    }
    return false;
  };

  mostrarAccion = () => {
    const { error, cargando } = this.props;
    if (cargando) {
      return <MinSpinner />;
    }
    if (error) {
      return <MinFatal mensaje={error} />;
    }
  };

  render() {
    return (
      <div>
        {this.props.regresar ? <Redirect to="/tareas" /> : ""}
        <h1>Guardar Tarea</h1>
        Usuario Id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.handleChange}
          name="usuario_id"
        />
        <br />
        <br />
        Titulo:
        <input
          type="text"
          value={this.props.titulo}
          onChange={this.handleChange}
          name="titulo"
        />
        <br />
        <br />
        <button onClick={this.onSave} disabled={this.deshabilitarBtn()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);

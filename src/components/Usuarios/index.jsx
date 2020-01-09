import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import UserList from './UserList';
import {FiUsers} from 'react-icons/fi';

import '../../css/index.css';
import '../../css/blogstyle.css';
import '../../css/card-list.css'

import * as usuariosActions from "../../actions/usuariosActions";

class Usuarios extends Component {
  componentDidMount() {
    if(!this.props.usuarios.length){
      this.props.traerTodos();
    }
  }

  ponerContenido = () => {
    
    if( this.props.cargando){
      return <Spinner/>
    }

    if(this.props.error){
      return <Fatal mensaje={this.props.error}/>
    }
    
    return (
      <UserList/>
    );
  };

  render() {
    console.log(this.props.cargando);
    console.log(this.props.error);
    return <div>
      <div className='title-cover'>
        <FiUsers color='#ffffff' size='10em'/>
        <h1 className='title-tag'>Usuarios</h1>
      </div>
        {this.ponerContenido()}
    </div>;
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};
export default connect(mapStateToProps, usuariosActions)(Usuarios);

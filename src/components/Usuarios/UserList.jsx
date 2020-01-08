import React from "react";
import { connect } from "react-redux";
import CardUser from './CardUser';

const UserList = props => {
  return (
    <div className='card-list'>
      {props.usuarios.map((usuario, key) => (
        <CardUser key={usuario.id} usuario={usuario} id={key} />
    ))}
    </div>
  );
};

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps)(UserList);

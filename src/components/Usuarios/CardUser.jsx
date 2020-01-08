import React from "react";
import { Link } from "react-router-dom";

function CardUser(props) {
  const { usuario, id } = props;
  return (
    <div>
      <div className="card-container">
        <div></div>
        <h2>{usuario.name}</h2>
        <h4>{usuario.username}</h4>
        <p>
          {usuario.company.catchPhrase} {usuario.company.bs}
        </p>
        <div>
          <p>{usuario.address.city}</p>
          <p>{usuario.website}</p>
        </div>
        <p>{usuario.email}</p>
        <Link to={`/publicaciones/${id}`}>
          <div className="eye-solid icon"></div>
        </Link>
      </div>
    </div>
  );
}

export default CardUser;

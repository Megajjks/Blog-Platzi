import React from "react";
import { Link } from "react-router-dom";

import {FiMapPin, FiMail, FiLink} from "react-icons/fi";
import Zoom from 'react-reveal/Zoom';

function CardUser(props) {
  const { usuario, id } = props;
  return (
    <div>
        <Link to={`/publicaciones/${id}`}>
            <Zoom>    
                <div className="card-container card-style">
                <div className='card-container-cover'>
                    <img className='img-cover-min' src={`https://i.picsum.photos/id/1${usuario.id}/300/100.jpg`} alt='cover-img'/>
                    <img className='img-round img-profile-min' src={`https://avatars.dicebear.com/v2/avataaars/${usuario.name}.svg`} alt='profile-img' />
                </div>
                <h2>{usuario.name}</h2>
                <h6>~{usuario.username}~</h6>
                <p>
                {usuario.company.catchPhrase} {usuario.company.bs}
                </p>
                <div className='card-item-data'>
                    <p className='card-item-data-space'> <FiMapPin color='#ff5252'/> {usuario.address.city}</p>
                    <p className='card-item-data-space'> <FiLink color='#34ace0'/> {usuario.website}</p>
                    <p className='card-item-data-space'> <FiMail color='#1e272e'/> {usuario.email}</p>
                </div>
                </div>
            </Zoom>
        </Link>
    </div>
  );
}

export default CardUser;

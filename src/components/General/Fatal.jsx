import React from "react";
import "../../css/error404.css";

const Fatal = props => {
  return (
    <div className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Ups! Parece que algo salio mal</h3>

                <p>{props.mensaje}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fatal;

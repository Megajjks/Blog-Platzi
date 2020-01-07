import React from "react";
import "../../css/spinner.css";

const Spinner = props => {
  return (
    <div className='PageLoading'>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;

import React from 'react';
import '../../css/min-spinner.css';

function MinSpinner() {
    return (
        <div className='d-flex flex-column justify-content-cente align-items-center'>
              <div className="lds-ellipsis"><div></div><div></div><div></div></div>
        </div>
    )
}

export default MinSpinner

import React from 'react';
import './index.scss';

const Modal = (props) => {
    if (!props.show) {
        return null;
    }

    return (
        <div className='modal'>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h2>{props.title}</h2>
                    <span className='close' onClick={props.onClose}>&times;</span>
                </div>
                <div className='modal-body'>
                    {props.children}
                </div>
                <div className='modal-footer'>
                    
                </div>
            </div>
        </div>
    )
}

export default Modal;
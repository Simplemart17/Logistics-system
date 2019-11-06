import React from 'react';
import './Modal.scss';

const Modal = ({ classes, showModal, renderHeader, renderContent, renderFooter }) => ((
  <div className={`${showModal ? 'modal-backdrop--show' : '' } modal-backdrop`}>
    <div className={`${showModal ? 'modal-container--show' : ''} modal-container`}>
      <div className={`modal-dialog ${classes}`}>
        <div className="modal-dialog__header">
          {renderHeader()}
        </div>
        <div className="modal-dialog__content">
          {renderContent()}
        </div>
        <div className="modal-dialog__footer">
          {renderFooter && renderFooter()}
        </div>
      </div>
    </div>
  </div>
));

export default Modal;

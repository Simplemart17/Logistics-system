/* eslint-disable default-case */
import React from 'react';
import './Address.scss';
import Button from '../Button/index';
import InputField from '../InputField/index';
import Modal from '../Modal/index';
import { inputList, inputGroup } from './fixture';


/**
 * This method renders the details for address modal
 * @returns {jsx}
 */
const renderViewAddressDetails = () => (
  <div>
    <h1>Work in progress...</h1>
  </div>
);

/**
 * This method renders the edit address modal
 *
 * @param {Object}
 *
 * @returns {jsx}
 */
const renderEditAddress = (props) => (
  <div className="address-modal__content">
    <div className="address-modal__form-group">
      <InputField
        autoFocus
        placeholder="Enter Street"
        disabled={false}
        onChange={props.handleChange}
        value={props.value}
        name="street"
        className="input-box"
      />
    </div>
    <div className="address-modal__input-group">
      {inputGroup.map((data, index) => (
        <div className="address-modal__form-field" key={index}>
          <InputField
            autoFocus
            placeholder={data.placeholder}
            disabled={false}
            onChange={props.handleChange}
            value={props.value}
            name={data.name}
          />
        </div>
      )
      )}
    </div>
    <div className="address-modal__input-group">
      {inputList.map((data, index) => (
        <div className="address-modal__form-field" key={index}>
          <InputField
            autoFocus
            placeholder={data.placeholder}
            disabled={false}
            onChange={props.handleChange}
            value={props.value}
            name={data.name}
          />
        </div>
      )
      )}
    </div>
  </div>
);

/**
 * This method returns header for the modal
 *
 * @param {string} modalAction
 *
 * @returns {Function}
 */
const renderModalHeader = (modalAction) => () => {
  switch (modalAction) {
    case 'view':
      return (<div className="address-modal__header">ADDRESS DETAILS</div>);

    case 'edit':
      return (<div className="address-modal__header">EDIT ADDRESS</div>);

    case 'create':
      return (<div className="address-modal__header">CREATE ADDRESS</div>);
  }
};

/**
 * This method returns the content of the modal
 *
 * @param {string} modalAction
 * @param {Object} addressModalContent
 *
 * @returns {Function}
 */
const renderModalContent =
  (modalAction, addressModalContent) => () => {
    if (modalAction === 'view') {
      return renderViewAddressDetails();
    }

    return renderEditAddress(addressModalContent);
  };

/**
 * This method renders the modal footer
 *
 * @param {string} modalAction
 * @param {Function} toggleModal
 * @param {Function} handleSubmit
 *
 * @returns {Function}
 */
const renderModalFooter = (modalAction, toggleModal, handleSubmit) => () => (
  <div className="address-modal__footer">
    {modalAction === 'view' ? (
      <div className="address-modal__footer__item">
        <Button
          name="CLOSE"
          type="button"
          onClick={toggleModal}
        />
      </div>
    ) : (
        <>
          <div className="address-modal__footer__item">
            <Button
              name="CANCEL"
              type="button"
              onClick={toggleModal}
            />
          </div>
          <div className="address-modal__footer__item">
            <Button
              name="SUBMIT"
              type="button"
              isActive
              onClick={handleSubmit}
            />
          </div>
        </>
      )}
  </div>
);

const AddressModal = (props) => {
  const { modalAction, showModal, toggleModal, handleSubmit, handleChange, value } = props;

  const addressModalContent = {
    value,
    handleChange,
  };

  return (
    <Modal
      showModal={showModal}
      renderContent={renderModalContent(modalAction, addressModalContent)}
      renderHeader={renderModalHeader(modalAction)}
      renderFooter={renderModalFooter(modalAction, toggleModal, handleSubmit)}
    />
  );
};

export default AddressModal;

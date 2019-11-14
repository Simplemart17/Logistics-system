/* eslint-disable default-case */
import React from 'react';
import './AddressModal.scss';
import Button from '../Button/index';
import InputField from '../InputField/index';
import Modal from '../Modal/index';
import { inputGroup } from './fixture';


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
 * @param {Object} props
 *
 * @returns {jsx}
 */
const renderEditAddress = (props) => (
    <div className='address-modal__input-group'>
      {inputGroup.map((data, index) => (
        <div className='address-modal__form-field' key={index}>
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
      return (<div className='address-modal__header'>ADDRESS DETAILS</div>);

    case 'edit':
      return (<div className='address-modal__header'>EDIT ADDRESS</div>);

    case 'create':
      return (<div className='address-modal__header'>CREATE ADDRESS</div>);
  }
};

/**
 * This method returns the content of the modal
 *
 * @param {string} modalAction
 * @param {Object} addressModalContent
 * @param {Object} viewAddressdetails
 *
 * @returns {Function}
 */
const renderModalContent =
  (modalAction, viewAddressDetails, addressModalContent) => () => {
    if (modalAction === 'view') {
      return renderViewAddressDetails(viewAddressDetails);
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
const renderModalFooter = (modalAction, toggleModal, handleSubmit, isLoading) => () => (
  <div className='address-modal__footer'>
    {modalAction === 'view' ? (
      <div className='address-modal__footer__item'>
        <Button
          name="CLOSE"
          type="button"
          onClick={toggleModal}
        />
      </div>
    ) : (
        <>
          <div className='address-modal__footer__item'>
            <Button
              name="CANCEL"
              type="button"
              onClick={toggleModal}
            />
          </div>
          <div className='address-modal__footer__item'>
            <Button
              name="SUBMIT"
              type="button"
              isActive
              onClick={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
  </div>
);

const AddressModal = (props) => {
  const { modalAction, showModal, toggleModal, handleSubmit, handleChange, value, isLoading, view } = props;

  const viewAddressDetails = {
    view,
  };
  
  const addressModalContent = {
    value,
    handleChange,
  };

  return (
    <Modal
      showModal={showModal}
      renderContent={renderModalContent(modalAction, viewAddressDetails, addressModalContent)}
      renderHeader={renderModalHeader(modalAction)}
      renderFooter={renderModalFooter(modalAction, toggleModal, handleSubmit, isLoading)}
    />
  );
};

export default AddressModal;

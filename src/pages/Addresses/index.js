import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard/index';
import './Addresses.scss';
import { getAddressAction, createAddressAction } from '../../store/addresses/index';
import { getUserProfile } from '../../store/auth/index';
import Button from '../../components/Button/index';
import AddressModal from '../../components/AddressModal/index';
import Spinner from '../../components/Spinner/index';

const Addresses = (props) => {
  const { profile, userDetails, createAddress, getAddresses, addresses, isLoading } = props;
  const [addressState, setAddressState] = useState({
    addressModalAction: 'view',
    showAddressModal: false,
    street: '',
    email: '',
    country: '',
    city: '',
    state: '',
    friendly_name: '',
  });
  const userId = userDetails.id;

  useEffect(() => {
    profile();
    getAddresses(userId);
  }, [profile, getAddresses, userId]);

    /**
   * This method open modal based on action to be performed
   * @param {String} modalName 
   * @returns {JSX}
   */
  const toggleModal = (modalName) => () => {
    switch (modalName.includes(modalName)) {
      case modalName.includes('view'):
        setAddressState({
          addressModalAction: 'view',
          showAddressModal: !addressState.showAddressModal,
        });
        break;
      case modalName.includes('edit'):
        setAddressState({
          addressModalAction: 'edit',
          showAddressModal: !addressState.showAddressModal,
        });
        break;
      case modalName.includes('create'):
        setAddressState({
          addressModalAction: 'create',
          showAddressModal: !addressState.showAddressModal,
        });
        break;
      default:
        setAddressState({ [modalName]: !addressState[modalName] });
    }
  }
 
  /**
   * This method render the card for addresses created by the user
   */
  const addressCard = () => {
    return(
      <div className='address-wrapper'>
        <h1 className='address-wrapper__header'>
          Addresses
        </h1>
        <div className='address-wrapper__button'>
          <Button
            name="Add New"
            isActive
            icon="https://res.cloudinary.com/dq7p8ff2f/image/upload/v1572984667/Assets/plus-icon.png"
            onClick={toggleModal('showAddressModal create')}
          />
        </div>
        <div className='address-card-wrapper'>
          <h1>List of Addresses</h1>
          <div className='address-card'>
          { isLoading ? <Spinner /> 
          : addresses.map(address => (
              <div key={address.id} className='address-card__box' onClick={toggleModal('showAddressModal view')}>
                <h4>City: {address.city}</h4>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    )
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setAddressState(() => ({ ...addressState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {  street, email, city, country, state, friendly_name } = addressState;
    const payload = { street, email, city, country, state, friendly_name, user: userId };
    
    await createAddress(payload);
    toggleModal('showAddressModal')()
  }

  const renderAddressModal = () => {
    return(
      <AddressModal
        showModal={addressState.showAddressModal}
        toggleModal={toggleModal('showAddressModal')}
        modalAction={addressState.addressModalAction}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    )
  }

  return(
    <div className='dashboard-container'>
      <Dashboard />
      {addressCard()}
      {renderAddressModal()}
    </div>
  )
}

const mapStateToProps = state => ({
  userDetails: state.auth.data,
  addresses: state.addresses.data,
  isLoading: state.auth.isLoading
});

const mapDispatchToProps = dispatch => ({
  profile: () => dispatch(getUserProfile()),
  getAddresses: (id) => dispatch(getAddressAction(id)),
  createAddress: payload => dispatch(createAddressAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);

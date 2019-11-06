import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import SideBar from '../../components/SideBar/index';
import './Dashboard.scss';
import { getUserProfile } from '../../store/auth/index';
import { getAddressAction, createAddressAction } from '../../store/addresses/index';
import Button from '../../components/Button/index';
import AddressModal from '../../components/AddressModal/index';

const Dashboard = ({ profile, userDetails, createAddress }) => {
  const [state, setState] = useState({
    addressModalAction: 'view',
    showAddressModal: false,
    street: '',
    email: '',
    country: '',
    city: '',
    friendly_name: '',
  });

  useEffect(() => {
    profile();
  }, [profile]);

 
  /**
   * This method open modal based on action to be performed
   * @param {String} modalName 
   * @returns {JSX}
   */
  const toggleModal = (modalName) => () => {
    switch (modalName.includes(modalName)) {
      case modalName.includes('view'):
        setState({
          addressModalAction: 'view',
          showAddressModal: !state.showAddressModal,
        });
        break;
      case modalName.includes('edit'):
        setState({
          addressModalAction: 'edit',
          showAddressModal: !state.showAddressModal,
        });
        break;
      case modalName.includes('create'):
        setState({
          addressModalAction: 'create',
          showAddressModal: !state.showAddressModal,
        });
        break;
      default:
        setState({ [modalName]: !state[modalName] });
    }
  }
 
  /**
   * This method render the card for address
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
        <div className='address-card'>
          <p>The new address</p>
        </div>
      </div>
    )
  };

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(name, value, state)
    setState(() => ({ ...state, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {  street, email, city, country, friendly_name } = state;
    const payload = { street, email, city, country, friendly_name };
    
    await createAddress(payload);
    toggleModal('showAddressModal')()
    console.log('successful')
  }

  const renderAddressModal = () => {
    return(
    <AddressModal
      showModal={state.showAddressModal}
      toggleModal={toggleModal('showAddressModal')}
      modalAction={state.addressModalAction}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
    )
  }

  return(
    <div className='dashboard-container'>
      <SideBar
        username={userDetails.username}
        email={userDetails.email}
      />
      {addressCard()}
      {renderAddressModal()}
    </div>
  )
};

const mapStateToProps = state => ({
  userDetails: state.auth.data,
  addresses: state.addresses.data
});

const mapDispatchToProps = dispatch => ({
  profile: () => dispatch(getUserProfile()),
  getAddresses: () => dispatch(getAddressAction()),
  createAddress: payload => dispatch(createAddressAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard/index';
import './Shipments.scss';
import { getShipmentAction } from '../../store/shipments/index';
import { getUserProfile } from '../../store/auth/index';
import Button from '../../components/Button/index';
import Spinner from '../../components/Spinner/index';

const Shipments = (props) => {
  const { profile, userDetails, shipments, getShipments, isLoading } = props;
  const userId = userDetails.id;

  useEffect(() => {
    profile();
    getShipments(userId);
  }, [profile, getShipments, userId]);
 
  /**
   * This method render the card for shipments created by the user
   */
  const shipmentCard = () => {
    return(
      <div className='shipment-wrapper'>
        <h1 className='shipment-wrapper__header'>
          Shipments
        </h1>
        <div className='shipment-wrapper__button'>
          <Button
            name="Add New"
            isActive
            icon="https://res.cloudinary.com/dq7p8ff2f/image/upload/v1572984667/Assets/plus-icon.png"
          />
        </div>
        <div className='shipment-card-wrapper'>
          <h1>List of Shipments</h1>
          <div className='shipment-card'>
          { isLoading ? <Spinner /> 
          : shipments.length === 0 ? <h4>No Records Found!</h4>
          : shipments.map(shipment => (
              <div key={shipment.id} className='shipment-card__box'>
                <div className='shipment-card__box--header'>
                  <h4>Origin</h4>
                  <p className='shipment-card__box--sub_header'>Address: <span>{shipment.origin.street}</span></p>
                </div>
                <div className='shipment-card__box--header'>
                  <h4>Destination</h4>
                  <p className='shipment-card__box--sub_header'>Address: <span>{shipment.destination.street}</span></p>
                </div>
                <div className='shipment-card__box--header'>
                  <h4>Courier</h4>
                  <p className='shipment-card__box--sub_header'>Name: <span>{shipment.courier.name}</span></p>
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </div>
    )
  };

  return(
    <div className='dashboard-container'>
      <Dashboard />
      {shipmentCard()}
    </div>
  )
}

const mapStateToProps = state => ({
  userDetails: state.auth.data,
  shipments: state.shipments.data,
  isLoading: state.auth.isLoading
});

const mapDispatchToProps = dispatch => ({
  profile: () => dispatch(getUserProfile()),
  getShipments: (id) => dispatch(getShipmentAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shipments);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Dashboard from '../Dashboard/index';
import './Couriers.scss';
import { getCourierAction } from '../../store/couriers/index';
import Spinner from '../../components/Spinner/index';

const Couriers = (props) => {
  const { getCourier, couriers, isLoading } = props;

  useEffect(() => {
    getCourier();
  }, [getCourier]);
 
  /**
   * This method render the card for all available couriers
   */
  const courierCard = () => {
    return(
      <div className='courier-wrapper'>
        <h1 className='courier-wrapper__header'>
          Couriers
        </h1>
        <div className='courier-card-wrapper'>
          <h1>List of Couriers</h1>
          <div className='courier-card'>
          { isLoading ? <Spinner /> 
          : couriers.map(courier => (
              <div key={courier.id} className='courier-card__box'>
                <div className='courier-card__box--header'>
                  <p>Name: {courier.name}</p>
                </div>
                <p className='courier-card__box--sub_header'>Email: <span>{courier.email}</span></p>
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
      {courierCard()}
    </div>
  )
}

const mapStateToProps = state => ({
  couriers: state.couriers.data,
  isLoading: state.auth.isLoading
});

const mapDispatchToProps = dispatch => ({
  getCourier: () => dispatch(getCourierAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Couriers);

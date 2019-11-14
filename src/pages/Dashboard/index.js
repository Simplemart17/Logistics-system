import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SideBar from '../../components/SideBar/index';
import { getUserProfile, logOutAction } from '../../store/auth/index';

const Dashboard = (props) => {
  const { profile, userDetails, logOut } = props;

  useEffect(() => { profile(); }, [profile]);

  return(
    <SideBar
      username={userDetails.username}
      email={userDetails.email}
      logOutUser={() => logOut()}
    />
  )
};

const mapStateToProps = state => ({
  userDetails: state.auth.data,
});

const mapDispatchToProps = dispatch => ({
  profile: () => dispatch(getUserProfile()),
  logOut: () => dispatch(logOutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

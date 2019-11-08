/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { history } from 'helpers';
import { authenticationActions } from 'actions';
import { connect } from 'react-redux';
import UserContext from '../../UserContext';
import './style.scss';

// eslint-disable-next-line react/display-name
const withContext = (Component) => (props) => (
  <UserContext.Consumer>
    {(context) => <Component {...props} context={context} />}
  </UserContext.Consumer>
);

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.handelClick = this.handelClick.bind(this);
  }
  handelClick = () => {
    this.props.dispatch(authenticationActions.logout());
    // store.dispatch(ProductActions.resetStatus());
    localStorage.removeItem('user');
    localStorage.removeItem('selectedBUData');
    if ((JSON.stringify(this.props.context.userData) !== JSON.stringify({}))) {
      this.props.context.updateUserData({});
    }
    history.push('/login');
    window.location.reload();
  }
  render() {
    return (
      <React.Fragment>
        <span className="logout_btn" color="link" onClick={this.handelClick}>
          Logout
        </span>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapDispatchToProps)(withContext(Logout));


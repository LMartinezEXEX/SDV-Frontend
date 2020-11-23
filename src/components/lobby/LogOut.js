import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';

const LogOut = (props) => {
    const { logout } = props;
    
    const handleOnClick = async (event) => {
        event.preventDefault();
        logout();
    }
    
    return (
        <div >
          <button className= "app-btn " onClick={handleOnClick}> Salir </button>
        </div>
    )
}

const mapDispatchToProps = {
  logout
};

export default connect(
  null,
  mapDispatchToProps
)(LogOut);
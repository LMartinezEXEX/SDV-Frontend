import React from "react";
import { Redirect } from "react-router-dom";

const AuthRoute = (props) => {
  const { isAuth, type } = props;

  if (type === "guest" || !isAuth) {
    // alert("As guest!")
    return <Redirect to="/" component={Home} />
  }
  if (type === "private" && isAuth) {
    // alert("Private dashboard!")
    return <Redirect from="/" to="/lobby" />
  }
  return <Route {...props} />;
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.authorization.isAuth,
    type: state.authorization.type
  };
}

export default connect(mapStateToProps)(AuthRoute);
import React from 'react'
import {
    BrowserRouter as Router,
    //Switch,
    Redirect,
    Route,
    useHistory
} from 'react-router-dom'
import { connect } from "react-redux";
import Home from './components/home/Home'
import Lobby from './components/lobby/Lobby'
import PreGame from './components/pregame/Pregame'
import Game from './components/game/game'
import PageNotFound from './components/PageNotFound'

const Routes = (props) => {
    const { isAuth, type } = props;
    const history = useHistory()

    if (type === "guest" && !isAuth) {
      // alert("As guest!")
      return (
        <Router history={history}>
          <Redirect to="/" />
          <Route exact path="/" component={Home} />
        </Router>
      );
    } else if (type === "private" && isAuth) {
      // alert("Private dashboard!")
      return (
        <Router history={history}>
            <Redirect from="/" to="/lobby" />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/pregame/:id" component={PreGame} />
            <Route exact path ='/game/:id' component={Game} />
        </Router>
      );
    }
    return (
        <Router history={history}>
            <Route component={PageNotFound}/>
        </Router>
    );
}
   
const mapStateToProps = (state) => {
  console.log("[AuthRoute.js] state: " + JSON.stringify(state.authorization))
  return {
    isAuth: state.authorization.isAuth,
    type: state.authorization.type
  };
}

export default connect(mapStateToProps)(Routes);
import React from 'react'
import {
    BrowserRouter as Router,
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
    const { isAuth, type, email, username } = props;
    const history = useHistory()

    if (type === "guest" && !isAuth) {
      return (
        <Router history={history}>
            <Redirect to="/" />
            <Route exact path="/" component={Home} />
        </Router>
      );
    } else if (type === "private" && isAuth) {
      return (
        <Router history={history}>
            <Redirect from="/" to="/lobby" />
            <Route exact path="/lobby" component={Lobby} >
                <Lobby email={email} username={username} />
            </Route>
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
    return {
        isAuth: state.user.isAuth,
        type: state.user.type,
        email: state.user.email,
        username: state.user.username
    };
}

export default connect(mapStateToProps)(Routes);
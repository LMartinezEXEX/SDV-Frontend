import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    useHistory
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/home/Home';
import Lobby from './components/lobby/Lobby';
import Pregame from './components/pregame/Pregame';
import Game from './components/game/game';
import PageNotFound from './components/PageNotFound';

const Routes = (props) => {
    const { isAuth, type, email, username, icon, gameId, init} = props;
    const history = useHistory()

    if (type === "guest" && !isAuth) {
        return (
            <Router history={history}>
            <Redirect to="/" />
            <Route exact path="/" component={Home} />
            </Router>
        );
    } else if (type === "private" && isAuth) {
        if (gameId && !init) {
            return (
                <Router history={history}>
                    <Redirect from="/lobby" to="/pregame" />
                    <Route path="/pregame" >
                    <Pregame />
                    </Route>
                </Router>)
        } else if (gameId && init) {
            return (
                <Router history={history}>
                    <Redirect from="/pregame" to={"/game/" + gameId} />
                    <Route path={"/game/" + gameId} >
                    <Game />
                    </Route>
                </Router>
            )
        } else {
            return (
                <Router history={history}>
                    <Redirect from="/" to="/lobby" />
                    <Route path="/lobby" >
                    <Lobby email={email} username={username} icon={icon} />
                    </Route>
                </Router>
            );
        }
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
        username: state.user.username,
        icon: state.user.icon,
        gameId: state.game.gameId,
        init: state.game.init
    };
}

export default connect(mapStateToProps)(Routes);
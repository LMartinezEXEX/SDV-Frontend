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
import PreGameContainer from './components/pregame/PregameContainer';
import GameContainer from './components/game/GameContainer';
import PageNotFound from './components/PageNotFound';

const Routes = (props) => {
    const { isAuth, type, email, username, icon, gameId, playerId, init} = props;
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
                    <PreGameContainer email={email} gameId={gameId} />
                    </Route>
                </Router>)
        } else if (gameId && init) {
            return (
                <Router history={history}>
                    <Redirect from="/pregame" to={"/game/" + gameId} />
                    <Route path={"/game/" + gameId} >
                    <GameContainer gameId={gameId} playerId={playerId} />
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
        playerId: state.game.playerId,
        init: state.game.init
    };
}

export default connect(mapStateToProps)(Routes);
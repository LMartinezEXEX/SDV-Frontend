import React from 'react';
import './assets/css/App.css';

import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <Routes />
            </div>
        </Provider>
    );
}

export default App;
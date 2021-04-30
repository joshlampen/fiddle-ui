import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './scripts/App';
import reducer from './scripts/reducers/app';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import './index.less';

const store = createStore(reducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>,
    document.getElementById('fiddle')
);

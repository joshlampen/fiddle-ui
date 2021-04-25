import React from 'react';
import ReactDOM from 'react-dom';

import './style/main.less';

class App extends React.Component {
    render() {
        return <div className="foo">Hello World !</div>;
    }
}
ReactDOM.render(<App />, document.getElementById('root'));

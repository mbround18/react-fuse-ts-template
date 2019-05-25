import * as React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import { routes } from './routes';
import { easyKey } from './utils/easyKey';
import './app.scss';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <div id="nav">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about/">About</Link>
              </li>
              <li>
                <Link to="/users/">Users</Link>
              </li>
            </ul>
          </nav>
          {routes &&
            routes.map(route => <Route key={easyKey(route)} {...route} />)}
        </div>
      </Router>
    );
    // return (
    //   <div className="App">
    //     <div className="App-header">
    //       <h2>Welcome to React!</h2>
    //     </div>
    //   </div>
    // );
  }
}
